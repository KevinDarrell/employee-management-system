export interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  hire_date: string;
  status: 'active' | 'inactive';
  createdAt?: string;
}

export interface EmployeeStats {
  totalEmployees: number;
  breakdown: {
    department: string;
    count: number;
    avgSalary: number;
  }[];
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    lastPage: number;
  };
}

export interface EmployeeFilters {
  page: number;
  limit: number;
  search?: string;
  department?: string;
  status?: string;
}