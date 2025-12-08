import { z } from 'zod';

export const employeeFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  position: z.string().min(2, "Position is required"),
  department: z.string().min(1, "Please select a department"),
  salary: z.number()
    .min(1000000, "Salary too low (Min: Rp 1.000.000)"),
  hire_date: z.string().min(1, "Hire date is required"),
  status: z.enum(['active', 'inactive']),
});

// Export tipe data dari schema ini agar bisa dipakai di component
export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;