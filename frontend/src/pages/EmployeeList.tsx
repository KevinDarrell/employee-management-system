import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Trash2, Edit, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion'; // Import Animasi
import { useEmployees, useSaveEmployee, useDeleteEmployee } from '../hooks/useEmployees';
import { Skeleton } from '../components/ui/Skeleton';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';

const EmployeeList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { data, isLoading, isError } = useEmployees({ 
    page, limit: 10, search, department, status: statusFilter 
  });

  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'danger' | 'warning'| 'info';
    onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', type: 'danger', onConfirm: () => {} });

  // Hook Actions
  const deleteMutation = useDeleteEmployee();
  const updateMutation = useSaveEmployee();

  // Handler Delete (Buka Dialog)
  const confirmDelete = (id: number, name: string) => {
    setDialogConfig({
      isOpen: true,
      title: 'Delete Employee',
      message: `Are you sure you want to permanently delete ${name}? This action cannot be undone.`,
      type: 'danger',
      onConfirm: () => {
        deleteMutation.mutate(id);
        setDialogConfig(prev => ({ ...prev, isOpen: false }));
      },
    });
  };

  // Handler Toggle (Buka Dialog jika Inactive)
  const handleToggle = (emp: any) => {
    const isCurrentlyActive = emp.status === 'active';
    const newStatus = isCurrentlyActive ? 'inactive' : 'active';
    
    const dialogTitle = isCurrentlyActive ? 'Deactivate Employee' : 'Activate Employee';
    
    const dialogMessage = isCurrentlyActive 
      ? `Are you sure you want to deactivate ${emp.name}? They will be hidden from active stats.`
      : `Are you sure you want to activate ${emp.name}? They will appear in active stats again.`;
      
    const dialogType = isCurrentlyActive ? 'warning' : 'info'; // Kuning vs Biru
    
    const confirmButtonText = isCurrentlyActive ? 'Deactivate' : 'Activate';

    setDialogConfig({
      isOpen: true,
      title: dialogTitle,
      message: dialogMessage,
      type: dialogType,
      onConfirm: () => {
        // Panggil API Update
        updateMutation.mutate({ id: emp.id, status: newStatus });
        // Tutup Dialog
        setDialogConfig(prev => ({ ...prev, isOpen: false }));
      },
    });
  };

  return (
    <div className="space-y-6">
        <Breadcrumbs items={[{ label: 'Employees' }]} />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
        <Link to="/employees/new" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all hover:-translate-y-0.5">
          <Plus className="w-5 h-5 mr-2" /> New Employee
        </Link>
      </div>

      {/* Filter Bar (Style dirapikan dikit) */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, email, position..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <div className="flex gap-4">
           {/* Dropdown Dept & Status sama seperti sebelumnya */}
           <select 
             className="px-4 py-2 border border-gray-200 rounded-lg bg-white outline-none focus:border-blue-500"
             value={department} 
             onChange={(e) => {setDepartment(e.target.value); setPage(1);}}
           >
             <option value="">All Depts</option>
             <option value="IT">IT</option>
             <option value="HR">HR</option>
             <option value="Product">Product</option>
             <option value="Marketing">Marketing</option>
           </select>
           <select 
             className="px-4 py-2 border border-gray-200 rounded-lg bg-white outline-none focus:border-blue-500"
             value={statusFilter} 
             onChange={(e) => {setStatusFilter(e.target.value); setPage(1);}}
           >
             <option value="">All Status</option>
             <option value="active">Active</option>
             <option value="inactive">Inactive</option>
           </select>
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[600px]">
        {isLoading ? (
           <div className="p-6 space-y-4"><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /></div>
        ) : (
          <div className="flex-1 overflow-auto relative"> {/* Scrollable Area */}
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
                  {data?.data.map((employee, index) => (
                    <motion.tr 
                      key={employee.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{employee.name}</div>
                        <div className="text-gray-500 text-xs">{employee.email}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-medium">
                        {employee.position}
                      </td>

                      {/* KOLOM DEPARTMENT (Sendiri) */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                          {employee.department}
                        </span>
                      </td>
                      
                      {/* TOGGLE STATUS (Soft Delete Logic) */}
                      <td className="px-6 py-4 text-center">
                         <div className="flex flex-col items-center gap-1.5">
                          <button
                            onClick={() => handleToggle(employee)}
                            className={clsx(
                              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                              employee.status === 'active' ? "bg-emerald-500" : "bg-slate-300"
                            )}
                          >
                            <span className={clsx("inline-block h-4 w-4 transform rounded-full bg-white transition-transform", employee.status === 'active' ? "translate-x-6" : "translate-x-1")} />
                          </button>
                          <span className={clsx("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border", employee.status === 'active' ? "text-emerald-700 bg-emerald-50 border-emerald-100" : "text-slate-500 bg-slate-100 border-slate-200")}>{employee.status}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link to={`/employees/edit/${employee.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></Link>
                          {/* DELETE TRIGGER DIALOG */}
                          <button onClick={() => confirmDelete(employee.id, employee.name)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination Tetap di Bawah (Sticky Bottom di dalam container flex) */}
        {data?.meta && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 shrink-0">
             {/* ... Pagination Controls UI ... */}
             <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Page {data.meta?.page} of {data.meta?.lastPage}</span>
                <div className="flex space-x-2">
                   <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 border border-gray-300 rounded hover:bg-white disabled:opacity-50"><ChevronLeft className="w-4 h-4"/></button>
                   <button onClick={() => setPage(p => Math.min(data.meta?.lastPage || 1, p + 1))} disabled={page === data.meta?.lastPage} className="p-2 border border-gray-300 rounded hover:bg-white disabled:opacity-50"><ChevronRight className="w-4 h-4"/></button>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* RENDER DIALOG GLOBAL */}
      <ConfirmDialog
        isOpen={dialogConfig.isOpen}
        title={dialogConfig.title}
        message={dialogConfig.message}
        type={dialogConfig.type}
        onConfirm={dialogConfig.onConfirm}
        onCancel={() => setDialogConfig(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default EmployeeList;