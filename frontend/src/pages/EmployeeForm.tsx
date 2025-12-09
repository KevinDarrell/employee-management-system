import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSaveEmployee, useEmployee } from '../hooks/useEmployees';
import { employeeFormSchema, type EmployeeFormValues } from '../lib/schemas';
import { Skeleton } from '../components/ui/Skeleton';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { EmployeeFormBody } from '../components/employees/EmployeeFormBody';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const { data: existingEmployee, isLoading: isLoadingData } = useEmployee(id);
  const mutation = useSaveEmployee(id);

  
  const formMethods = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '', email: '', position: '', department: '',
      salary: 0, hire_date: '', status: 'active',
    },
  });

  const { reset, formState: { isSubmitting } } = formMethods;


  useEffect(() => {
    if (existingEmployee) {
      const formattedDate = new Date(existingEmployee.hire_date).toISOString().split('T')[0];
      reset({ ...existingEmployee, hire_date: formattedDate });
    }
  }, [existingEmployee, reset]);

 
  const onSubmit = (data: EmployeeFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => navigate('/employees'),
    });
  };


  if (isEditMode && isLoadingData) return <div className="max-w-2xl mx-auto space-y-6"><Skeleton className="h-10 w-48" /><Skeleton className="h-96 w-full" /></div>;

  const breadcrumbItems = [
    { label: 'Employees', href: '/employees' },
    { label: isEditMode ? 'Edit Employee' : 'Add New Employee' }
  ];

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

    
      <EmployeeFormBody 
        form={formMethods} 
        onSubmit={onSubmit} 
        isSubmitting={isSubmitting || mutation.isPending}
      />
    </motion.div>
  );
};

export default EmployeeForm;