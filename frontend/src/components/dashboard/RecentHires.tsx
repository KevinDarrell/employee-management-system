import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../ui/Card';

export const RecentHires = ({ employees }: { employees: any[] }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const currentData = employees.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Card className="h-[450px] flex flex-col">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Recent Hires</h2>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{employees.length} Total</span>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {currentData.map((emp: any) => (
          <div key={emp.id} className="flex items-center px-6 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm mr-4 shadow-sm">
              {emp.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 line-clamp-1">{emp.name}</p>
              <p className="text-xs text-gray-500">{emp.position}</p>
            </div>
            <div className="ml-auto text-xs text-gray-400 whitespace-nowrap">
              {new Date(emp.hire_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 hover:bg-white rounded-md disabled:opacity-30">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <span className="text-xs font-medium text-gray-500">Page {page} / {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 hover:bg-white rounded-md disabled:opacity-30">
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </Card>
  );
};