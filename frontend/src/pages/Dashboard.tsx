import { Users, Briefcase, TrendingUp } from 'lucide-react';
import { useStats } from '../hooks/useEmployees';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

const Dashboard = () => {
  const { data: stats, isLoading } = useStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    { label: 'Total Active', value: stats.totalEmployees, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Departments', value: stats.breakdown.length, icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Avg Salary', value: `Rp ${Math.round(stats.breakdown.reduce((acc, curr) => acc + curr.avgSalary, 0) / (stats.breakdown.length || 1) / 1000000)}jt`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Executive Dashboard</h1>

      {/* 1. Top Stats (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <Card key={card.label} className="p-6 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{card.label}</p>
              <h3 className="text-3xl font-bold text-gray-900">{card.value}</h3>
            </div>
            <div className={`p-4 rounded-full ${card.bg} ${card.color}`}>
              <card.icon className="w-6 h-6" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Chart Section (Visualisasi Dept) - Memakan 2 kolom */}
        <Card className="lg:col-span-2 p-6 flex flex-col h-[400px]">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Employee Distribution & Salary</h2>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.breakdown}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="department" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#F3F4F6' }}
                />
                <Bar dataKey="avgSalary" name="Avg Salary" radius={[4, 4, 0, 0]}>
                  {stats.breakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 3. Recent Activity (Sidebar style) - Memakan 1 kolom */}
        <Card className="h-[400px] flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Recent Hires</h2>
          </div>
          <div className="overflow-y-auto flex-1 p-0">
            {stats.recent.map((emp) => (
              <div key={emp.id} className="flex items-center px-6 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold mr-4">
                  {emp.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{emp.name}</p>
                  <p className="text-xs text-gray-500">{emp.position} • {emp.department}</p>
                </div>
                <div className="ml-auto text-xs text-gray-400">
                  {new Date(emp.hire_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;