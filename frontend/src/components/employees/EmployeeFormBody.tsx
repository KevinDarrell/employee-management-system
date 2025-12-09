import { Link } from 'react-router-dom';
import { Save } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import { FormInput } from '../ui/FormInput';
import { FormSelect } from '../ui/FormSelect';
import type {  EmployeeFormValues } from '../../lib/schemas';

const DEPARTMENTS = [
  { value: 'IT', label: 'IT' },
  { value: 'HR', label: 'HR' },
  { value: 'Product', label: 'Product' },
  { value: 'Marketing', label: 'Marketing' },
];

interface EmployeeFormBodyProps {
  form: UseFormReturn<EmployeeFormValues>;
  onSubmit: (data: EmployeeFormValues) => void;
  isSubmitting: boolean;
}

export const EmployeeFormBody = ({ form, onSubmit, isSubmitting }: EmployeeFormBodyProps) => {
  const { register, handleSubmit, formState: { errors } } = form;

  return (
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

        <FormInput
          label="Hire Date"
          type="date"
          error={errors.hire_date}
          {...register('hire_date')}
        />
        
        {/* Hidden Status Field */}
        <input type="hidden" {...register('status')} />

        <div className="flex justify-end pt-6 border-t border-gray-100">
          <Link to="/employees" className="px-6 py-2.5 mr-4 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};