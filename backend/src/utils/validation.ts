import { z } from 'zod';

export const employeeSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  position: z.string().min(2, "Position is required"),
  department: z.string().min(2, "Department is required"),
  salary: z.number().positive("Salary must be a positive number"),
  hire_date: z.string().or(z.date()).transform((str) => new Date(str)), 
  status: z.enum(['active', 'inactive']).optional().default('active'),
});


export type EmployeeInput = z.infer<typeof employeeSchema>;