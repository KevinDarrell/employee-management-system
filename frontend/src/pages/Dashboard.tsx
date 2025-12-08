import { Users, Briefcase } from 'lucide-react'; // Hapus DollarSign jika tidak dipakai
import { useStats } from '../hooks/useEmployees';

const Dashboard = () => {
  const { data: stats, isLoading, error } = useStats();

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error loading stats.</div>;
  if (!stats) return null;

  const statCards = [
    { label: 'Total Active Employees', value: stats.totalEmployees, icon: Users, color: 'bg-blue-500' },
    { label: 'Departments', value: stats.breakdown.length, icon: Briefcase, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className={`p-3 rounded-lg ${card.color} text-white mr-4`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Department Breakdown</h2>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-3">Dept</th>
                <th className="px-6 py-3">Count</th>
                <th className="px-6 py-3">Avg. Salary</th>
              </tr>
            </thead>
            <tbody>
              {stats.breakdown.map((dept) => (
                <tr key={dept.department} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{dept.department}</td>
                  <td className="px-6 py-4">{dept.count}</td>
                  <td className="px-6 py-4">Rp {new Intl.NumberFormat('id-ID').format(dept.avgSalary)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* NEW: Recent Additions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Recent Additions</h2>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent.map((emp) => (
                <tr key={emp.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{emp.name}</div>
                    <div className="text-xs text-gray-500">{emp.department}</div>
                  </td>
                  <td className="px-6 py-4">{emp.position}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(emp.hire_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {stats.recent.length === 0 && (
                 <tr><td colSpan={3} className="p-4 text-center text-gray-400">No data yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;