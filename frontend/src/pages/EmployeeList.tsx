import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEmployees, useSaveEmployee, useDeleteEmployee } from '../hooks/useEmployees';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
// Import Components Pecahan
import { EmployeeFilter } from '../components/employees/EmployeeFilter';
import { EmployeeTable } from '../components/employees/EmployeeTable';

const EmployeeList = () => {
  // 1. State Management
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean; title: string; message: string; confirmText?: string;
    type: 'danger' | 'warning' | 'info'; onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', type: 'danger', onConfirm: () => {} });

  // 2. Data Fetching
  const { data, isLoading, isError } = useEmployees({ 
    page, limit: 10, search, department, status: statusFilter 
  });
  
  // 3. Mutations
  const deleteMutation = useDeleteEmployee();
  const updateMutation = useSaveEmployee();

  // 4. Event Handlers
  const confirmDelete = (id: number, name: string) => {
    setDialogConfig({
      isOpen: true,
      title: 'Delete Employee',
      message: `Are you sure you want to permanently delete ${name}?`,
      confirmText: 'Delete Permanently',
      type: 'danger',
      onConfirm: () => {
        deleteMutation.mutate(id);
        setDialogConfig(prev => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleToggle = (emp: any) => {
    const isCurrentlyActive = emp.status === 'active';
    const newStatus = isCurrentlyActive ? 'inactive' : 'active';
    
    setDialogConfig({
      isOpen: true,
      title: isCurrentlyActive ? 'Deactivate Employee' : 'Activate Employee',
      message: isCurrentlyActive 
        ? `Hide ${emp.name} from active stats?`
        : `Re-activate ${emp.name}?`,
      confirmText: isCurrentlyActive ? 'Deactivate' : 'Activate',
      type: isCurrentlyActive ? 'warning' : 'info',
      onConfirm: () => {
        updateMutation.mutate({ id: emp.id, status: newStatus });
        setDialogConfig(prev => ({ ...prev, isOpen: false }));
      },
    });
  };

  // 5. Render View
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Employees' }]} />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
        <Link to="/employees/new" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all hover:-translate-y-0.5">
          <Plus className="w-5 h-5 mr-2" /> New Employee
        </Link>
      </div>

      <EmployeeFilter 
        search={search} setSearch={(v) => {setSearch(v); setPage(1)}}
        department={department} setDepartment={(v) => {setDepartment(v); setPage(1)}}
        status={statusFilter} setStatus={(v) => {setStatusFilter(v); setPage(1)}}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[600px]"> 
        {isError ? (
          <div className="flex flex-col items-center justify-center h-full text-red-500">
            <AlertCircle className="w-10 h-10 mb-2" />
            <p>Failed to load data.</p>
          </div>
        ) : (
          <EmployeeTable 
            data={data?.data || []}
            isLoading={isLoading}
            onToggleStatus={handleToggle}
            onDelete={confirmDelete}
          />
        )}
        
        {/* Pagination Footer */}
        {data?.meta && !isError && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 shrink-0 flex justify-between items-center">
             <span className="text-sm text-gray-500">Page {data.meta?.page} of {data.meta?.lastPage}</span>
             <div className="flex space-x-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 border border-gray-300 rounded hover:bg-white disabled:opacity-50"><ChevronLeft className="w-4 h-4"/></button>
                <button onClick={() => setPage(p => Math.min(data.meta?.lastPage || 1, p + 1))} disabled={page === data.meta?.lastPage} className="p-2 border border-gray-300 rounded hover:bg-white disabled:opacity-50"><ChevronRight className="w-4 h-4"/></button>
             </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        {...dialogConfig}
        onCancel={() => setDialogConfig(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default EmployeeList;