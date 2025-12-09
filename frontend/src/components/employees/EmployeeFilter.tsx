import { Search } from 'lucide-react';

interface FilterProps {
  search: string;
  setSearch: (val: string) => void;
  department: string;
  setDepartment: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
}

export const EmployeeFilter = ({ search, setSearch, department, setDepartment, status, setStatus }: FilterProps) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name, email, position..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
         <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white outline-none focus:border-blue-500" value={department} onChange={(e) => setDepartment(e.target.value)}>
           <option value="">All Depts</option>
           <option value="IT">IT</option>
           <option value="HR">HR</option>
           <option value="Product">Product</option>
           <option value="Marketing">Marketing</option>
         </select>
         <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white outline-none focus:border-blue-500" value={status} onChange={(e) => setStatus(e.target.value)}>
           <option value="">All Status</option>
           <option value="active">Active</option>
           <option value="inactive">Inactive</option>
         </select>
      </div>
    </div>
  );
};