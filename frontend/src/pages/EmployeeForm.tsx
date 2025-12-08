import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft, Save } from 'lucide-react';
import { motion } from 'framer-motion'; // Animasi Form
import { useSaveEmployee, useEmployee } from '../hooks/useEmployees';
import { employeeFormSchema, type EmployeeFormValues } from '../lib/schemas';
import { FormInput } from '../components/ui/FormInput';
import { FormSelect } from '../components/ui/FormSelect';
import { Skeleton } from '../components/ui/Skeleton';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

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
  const mutation = useSaveEmployee(id); // Jika ada ID, dia update. Jika null, create.

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    mode: 'onTouched', // <--- SMOOTHER UX: Validasi saat disentuh/blur
    defaultValues: {
      name: '',
      email: '',
      position: '',
      department: '',
      salary: 0,
      hire_date: '',
      status: 'active', // Default hidden value
    },
  });

  useEffect(() => {
    if (existingEmployee) {
      const formattedDate = new Date(existingEmployee.hire_date).toISOString().split('T')[0];
      reset({ ...existingEmployee, hire_date: formattedDate });
    }
  }, [existingEmployee, reset]);

  const onSubmit = (data: EmployeeFormValues) => {
    // Pastikan status terbawa (atau backend handle default)
    mutation.mutate(data, {
      onSuccess: () => navigate('/employees'),
    });
  };

  const breadcrumbItems = [
    { label: 'Employees', href: '/employees' },
    { label: isEditMode ? 'Edit Employee' : 'Add New Employee' }
  ];

  if (isEditMode && isLoadingData) return <div className="max-w-2xl mx-auto space-y-6"><Skeleton className="h-10 w-48" /><Skeleton className="h-96 w-full" /></div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6"
    >
        <Breadcrumbs items={breadcrumbItems} />
      <div className="flex items-center space-x-4">
        <Link to="/employees" className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditMode ? 'Edit Employee' : 'Add New Employee'}
        </h1>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
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

          {/* Hire Date Full Width karena Status sudah dihapus */}
          <FormInput
            label="Hire Date"
            type="date"
            error={errors.hire_date}
            {...register('hire_date')}
          />
          
          {/* Hidden Status Field (Untuk menjaga konsistensi data form) */}
          <input type="hidden" {...register('status')} />

          <div className="flex justify-end pt-6 border-t border-gray-100">
            <Link to="/employees" className="px-6 py-2.5 mr-4 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || mutation.isPending}
              className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting || mutation.isPending ? 'Saving...' : 'Save Employee'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default EmployeeForm;