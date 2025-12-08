import React, { forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';
import clsx from 'clsx';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          ref={ref}
          className={clsx(
            "w-full px-4 py-2 border rounded-lg outline-none transition-colors",
            "focus:ring-2 focus:ring-blue-500",
            error 
              ? "border-red-500 focus:border-red-500" 
              : "border-gray-300 focus:border-blue-500"
          )}
          {...props}
        />
        {error && (
          <p className="text-red-500 text-sm mt-1">{error.message}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";