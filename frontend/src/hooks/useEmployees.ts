import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import api from '../lib/axios';
import type { Employee, EmployeeStats, ApiResponse, EmployeeFilters } from '../types';
import toast from 'react-hot-toast';

// --- HOOK 1: GET ALL EMPLOYEES ---
export const useEmployees = (filters: EmployeeFilters) => {
  return useQuery<ApiResponse<Employee[]>>({
    queryKey: ['employees', filters], 
    queryFn: async () => {
      const params = new URLSearchParams({
        page: filters.page.toString(),
        limit: filters.limit.toString(),
        search: filters.search || '',
        ...(filters.department && { department: filters.department }),
        ...(filters.status && { status: filters.status }),
      });
      const res = await api.get(`/employees?${params}`);
      return res.data;
    },
    // FIX untuk React Query v5: Gunakan placeholderData bukan keepPreviousData: true
    placeholderData: keepPreviousData, 
  });
};

// --- HOOK 2: GET STATS (Untuk Dashboard) ---
export const useStats = () => {
  return useQuery<EmployeeStats>({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await api.get('/employees/stats');
      return res.data;
    }
  });
};

// --- HOOK 3: DELETE EMPLOYEE ---
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await api.delete(`/employees/${id}`);
    },
    onSuccess: () => {
      toast.success('Employee deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['employees'] }); // Refresh list
      queryClient.invalidateQueries({ queryKey: ['stats'] });     // Refresh dashboard
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete employee');
    }
  });
};

// --- HOOK 4: GET SINGLE EMPLOYEE (Untuk Edit) ---
export const useEmployee = (id: string | undefined) => {
  return useQuery<Employee>({
    queryKey: ['employee', id],
    queryFn: async () => {
      const res = await api.get(`/employees/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

// --- HOOK 5: CREATE / UPDATE ---
export const useSaveEmployee = (initialId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: any) => {
      const targetId = variables.id || initialId;
      const { id: _, ...dataToSend } = variables;

      if (targetId) {
        return await api.put(`/employees/${targetId}`, dataToSend);
      }
      return await api.post('/employees', dataToSend);
    },
    onSuccess: (_, variables) => { // variable berisi data yang dikirim
      // LOGIC TOAST PINTAR
      if (variables.status === 'inactive') {
        toast.success('Employee deactivated');
      } else if (variables.status === 'active') {
        toast.success('Employee activated');
      } else {
        toast.success('Operation successful'); // Default untuk Add/Edit Form
      }
      
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.error || 'Something went wrong';
      toast.error(msg);
    }
  });
};