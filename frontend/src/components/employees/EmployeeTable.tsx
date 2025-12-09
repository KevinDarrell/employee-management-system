import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '../ui/Skeleton';


interface EmployeeTableProps {
  data: any[]; 
  isLoading: boolean;
  onToggleStatus: (employee: any) => void;
  onDelete: (id: number, name: string) => void;
}

export const EmployeeTable = ({ data, isLoading, onToggleStatus, onDelete }: EmployeeTableProps) => {
  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-12 w-1/4" />
            <Skeleton className="h-12 w-1/4" />
            <Skeleton className="h-12 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto relative">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-500 uppercase font-semibold sticky top-0 z-10 shadow-sm">
          <tr>
            <th className="px-6 py-4 bg-gray-50">Name / Email</th>
            <th className="px-6 py-4 bg-gray-50">Position</th>
            <th className="px-6 py-4 bg-gray-50">Department</th>
            <th className="px-6 py-4 bg-gray-50 text-center">Status</th>
            <th className="px-6 py-4 bg-gray-50 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <AnimatePresence>
            {data.map((employee, index) => (
              <motion.tr
                key={employee.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-blue-50/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{employee.name}</div>
                  <div className="text-gray-500 text-xs">{employee.email}</div>
                </td>
                
                <td className="px-6 py-4 text-gray-700 font-medium">
                  {employee.position}
                </td>

                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                    {employee.department}
                  </span>
                </td>

                {/* Status Toggle UI */}
                <td className="px-6 py-4 text-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      onClick={() => onToggleStatus(employee)}
                      className={clsx(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                        employee.status === 'active' 
                          ? "bg-emerald-500 focus:ring-emerald-500" 
                          : "bg-slate-300 focus:ring-slate-400"
                      )}
                    >
                      <span className={clsx("inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm", employee.status === 'active' ? "translate-x-6" : "translate-x-1")} />
                    </button>
                    <span className={clsx(
                      "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                      employee.status === 'active'
                        ? "text-emerald-700 bg-emerald-50 border-emerald-100"
                        : "text-slate-500 bg-slate-100 border-slate-200"
                    )}>
                      {employee.status}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link 
                      to={`/employees/edit/${employee.id}`} 
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button 
                      onClick={() => onDelete(employee.id, employee.name)} 
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
          {data.length === 0 && !isLoading && (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                No employees found matching your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};