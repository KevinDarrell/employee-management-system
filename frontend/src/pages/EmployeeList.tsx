import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Trash2, Edit, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion'; // Import Animasi
import { useEmployees, useSaveEmployee, useDeleteEmployee } from '../hooks/useEmployees';
import { Skeleton } from '../components/ui/Skeleton';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

const EmployeeList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { data, isLoading, isError } = useEmployees({ 
    page, limit: 5, search, department, status: statusFilter 
  });
  
  // Hook Delete Permanen (Tombol Tong Sampah)
  const deleteMutation = useDeleteEmployee();
  
  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Permanently delete ${name}? This cannot be undone.`)) {
      deleteMutation.mutate(id);
    }
  };

  // Logic Toggle Status
  const updateMutation = useSaveEmployee();
  const handleToggle = (emp: any) => {
    const newStatus = emp.status === 'active' ? 'inactive' : 'active';
    if (newStatus === 'inactive') {
      if(!window.confirm(`Deactivate ${emp.name}? They won't appear in active stats.`)) return;
    }
    updateMutation.mutate({ id: emp.id, status: newStatus }); // Kirim ID dan data partial
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[1,2,3,4,5].map(i => <div key={i} className="flex gap-4"><Skeleton className="h-12 w-1/4" /><Skeleton className="h-12 w-1/4" /><Skeleton className="h-12 w-1/2" /></div>)}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/50 text-gray-500 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Name / Email</th>
                  <th className="px-6 py-4">Position</th>
                  <th className="px-6 py-4">Departement</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <AnimatePresence>
                  {data?.data.map((employee, index) => (
                    <motion.tr 
                      key={employee.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: index * 0.05 }} // Staggered animation
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
                          {/* Tombol Toggle */}
                          <button
                            onClick={() => handleToggle(employee)}
                            className={clsx(
                              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                              employee.status === 'active' 
                                ? "bg-emerald-500 focus:ring-emerald-500" 
                                : "bg-slate-300 focus:ring-slate-400"
                            )}
                          >
                            <span className={clsx("inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm", employee.status === 'active' ? "translate-x-6" : "translate-x-1")} />
                          </button>
                          
                          {/* Label Status Modern */}
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

                      {/* ACTION BUTTONS (Edit & Permanen Delete) */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link 
                            to={`/employees/edit/${employee.id}`}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(employee.id, employee.name)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            {/* Pagination UI sama ... */}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;