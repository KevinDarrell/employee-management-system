import React, { forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';
import clsx from 'clsx';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: FieldError;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, options, error, className, ...props }, ref) => {
    return (
      <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <select
          ref={ref}
          className={clsx(
            "w-full px-4 py-2 border rounded-lg outline-none bg-white transition-colors",
            "focus:ring-2 focus:ring-blue-500",
            error 
              ? "border-red-500 focus:border-red-500" 
              : "border-gray-300 focus:border-blue-500"
          )}
          {...props}
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-red-500 text-sm mt-1">{error.message}</p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";