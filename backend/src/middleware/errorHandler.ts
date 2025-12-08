import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[ERROR]:`, err);

  
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation Error",
      
      details: err.issues.map((e) => ({ 
        field: e.path.join('.'), 
        message: e.message 
      }))
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({ 
        error: "Conflict", 
        message: "Data with this unique field already exists" 
      });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({ 
        error: "Not Found", 
        message: "Record not found" 
      });
    }
  }

  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === 'development' ? err.message : "Something went wrong"
  });
};