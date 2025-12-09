import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { employeeSchema } from '../utils/validation';
import prisma from '../config/db';


const throwNotFound = (message: string) => {
  const error: any = new Error(message);
  error.code = 'P2025'; 
  throw error;
};


export const getEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { department, status, search, page = 1, limit = 10 } = req.query;
    

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const whereClause: any = {};
    if (department) whereClause.department = String(department);
    if (status) whereClause.status = String(status);

    if (search) {
      whereClause.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { email: { contains: String(search), mode: 'insensitive' } },
        { position: { contains: String(search), mode: 'insensitive' } },
        { department: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip,
        take
      }),
      prisma.employee.count({ where: whereClause })
    ]);

    res.json({
      data: employees,
      meta: {
        total,
        page: Number(page),
        lastPage: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    next(error); 
  }
};

export const getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: { id: Number(id) }
    });

    if (!employee) throwNotFound("Employee not found");

    res.json(employee);
  } catch (error) {
    next(error);
  }
};


export const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = employeeSchema.parse(req.body); 

    const newEmployee = await prisma.employee.create({
      data: validatedData
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    next(error); 
  }
};

export const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validatedData = employeeSchema.partial().parse(req.body);

    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(id) },
      data: validatedData
    });

    res.json(updatedEmployee);
  } catch (error) {
    next(error); 
  }
};


export const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const exists = await prisma.employee.findUnique({ where: { id: Number(id) }});
    if (!exists) throwNotFound("Employee not found");

    await prisma.employee.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Employee deleted permanently" });
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalEmployees = await prisma.employee.count({ where: { status: 'active' }});
    const deptStats = await prisma.employee.groupBy({
      by: ['department'],
      where: { status: 'active' },
      _count: { id: true },
      _avg: { salary: true }
    });

    const recentEmployees = await prisma.employee.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' }, 
      select: {
        id: true,
        name: true,
        department: true,
        position: true,
        status: true,
        hire_date: true
      }
    });

    res.json({
      totalEmployees,
      breakdown: deptStats.map(d => ({
        department: d.department,
        count: d._count.id,
        avgSalary: Math.round(d._avg.salary || 0)
      })),
      recent: recentEmployees
    });
  } catch (error) {
    next(error);
  }
};