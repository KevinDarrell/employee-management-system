import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import api from '../lib/axios';
import type { Employee, EmployeeStats, ApiResponse, EmployeeFilters } from '../types';
import toast from 'react-hot-toast';


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
  
    placeholderData: keepPreviousData, 
  });
};

export const useStats = () => {
  return useQuery<EmployeeStats>({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await api.get('/employees/stats');
      return res.data;
    }
  });
};


export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await api.delete(`/employees/${id}`);
    },
    onSuccess: () => {
      toast.success('Employee deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['employees'] }); 
      queryClient.invalidateQueries({ queryKey: ['stats'] });     
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete employee');
    }
  });
};

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


export const useSaveEmployee = (initialId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: any) => {
      const targetId = variables.id || initialId;
      const { id: _, ...dataToSend } = variables;

      if (targetId) {
        return { 
          result: await api.put(`/employees/${targetId}`, dataToSend), 
          action: 'update',
          payload: variables 
        };
      }
      return { 
        result: await api.post('/employees', dataToSend), 
        action: 'create',
        payload: variables
      };
    },
    onSuccess: (data) => {
      const { action, payload } = data;

      if (action === 'create') {
        toast.success('New employee added successfully');
      } else if (payload.status === 'inactive') {
        toast.success('Employee deactivated');
      } else if (payload.status === 'active' && Object.keys(payload).length === 2) { 
        toast.success('Employee activated');
      } else {
        toast.success('Employee data updated'); 
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