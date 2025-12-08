import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft, Save } from 'lucide-react';

import { useSaveEmployee, useEmployee } from '../hooks/useEmployees';
import { employeeFormSchema, type EmployeeFormValues } from '../lib/schemas';
import { FormInput } from '../components/ui/FormInput';
import { FormSelect } from '../components/ui/FormSelect';

const DEPARTMENTS = [
  { value: 'IT', label: 'IT' },
  { value: 'HR', label: 'HR' },
  { value: 'Product', label: 'Product' },
  { value: 'Marketing', label: 'Marketing' },
];

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const { data: existingEmployee, isLoading: isLoadingData } = useEmployee(id);
  const mutation = useSaveEmployee(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    // FIX ERROR 2: Definisikan defaultValues disini secara eksplisit
    defaultValues: {
      name: '',
      email: '',
      position: '',
      department: '',
      salary: 0,
      hire_date: '',
      status: 'active', // <--- Default Value dihandle oleh UI (React), bukan Zod
    },
  });

  useEffect(() => {
    if (existingEmployee) {
      const formattedDate = new Date(existingEmployee.hire_date).toISOString().split('T')[0];
      reset({
        name: existingEmployee.name,
        email: existingEmployee.email,
        position: existingEmployee.position,
        department: existingEmployee.department,
        salary: existingEmployee.salary,
        hire_date: formattedDate,
        status: existingEmployee.status,
      });
    }
  }, [existingEmployee, reset]);

  const onSubmit = (data: EmployeeFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => navigate('/employees'),
    });
  };

  if (isEditMode && isLoadingData) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/employees" className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditMode ? 'Edit Employee' : 'Add New Employee'}
        </h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <FormInput
            label="Full Name"
            placeholder="e.g. Budi Santoso"
            error={errors.name}
            {...register('name')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Email"
              type="email"
              placeholder="email@company.com"
              error={errors.email}
              {...register('email')}
            />
            <FormInput
              label="Position"
              placeholder="e.g. Senior Engineer"
              error={errors.position}
              {...register('position')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              label="Department"
              options={DEPARTMENTS}
              error={errors.department}
              {...register('department')}
            />
            <FormInput
              label="Salary (IDR)"
              type="number"
              placeholder="e.g. 10000000"
              error={errors.salary}
              {...register('salary', { valueAsNumber: true })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Hire Date"
              type="date"
              error={errors.hire_date}
              {...register('hire_date')}
            />
            
            {/* Radio Button Manual (Karena structure unik) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="flex space-x-4 mt-2">
                <label className="flex items-center cursor-pointer">
                  <input 
                    {...register('status')} 
                    type="radio" 
                    value="active" 
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" 
                  />
                  <span className="ml-2 text-gray-700">Active</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    {...register('status')} 
                    type="radio" 
                    value="inactive" 
                    className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300" 
                  />
                  <span className="ml-2 text-gray-700">Inactive</span>
                </label>
              </div>
              {/* Menampilkan error status jika ada */}
              {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Link to="/employees" className="px-6 py-2 mr-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || mutation.isPending}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Save className="w-5 h-5 mr-2" />
              {isSubmitting || mutation.isPending ? 'Saving...' : 'Save Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;