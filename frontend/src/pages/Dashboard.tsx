import { Users, DollarSign, Briefcase } from 'lucide-react';
import { useStats } from '../hooks/useEmployees'; // Import Hook

const Dashboard = () => {
  // Panggil Custom Hook
  const { data: stats, isLoading, error } = useStats();

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error loading stats. Is backend running?</div>;

  // Pastikan data ada sebelum dirender
  if (!stats) return null;

  const statCards = [
    { 
      label: 'Total Employees', 
      value: stats.totalEmployees, 
      icon: Users, 
      color: 'bg-blue-500' 
    },
    { 
      label: 'Departments', 
      value: stats.breakdown.length, 
      icon: Briefcase, 
      color: 'bg-purple-500' 
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Department Breakdown Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Department Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Employee Count</th>
                <th className="px-6 py-3">Avg. Salary</th>
              </tr>
            </thead>
            <tbody>
              {stats.breakdown.map((dept) => (
                <tr key={dept.department} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{dept.department}</td>
                  <td className="px-6 py-4">{dept.count}</td>
                  <td className="px-6 py-4">
                    Rp {new Intl.NumberFormat('id-ID').format(dept.avgSalary)}
                  </td>
                </tr>
              ))}
              {stats.breakdown.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                    No data available. Add employees to see stats.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;