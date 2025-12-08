import { useState } from 'react';
import { Users, Briefcase, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStats } from '../hooks/useEmployees';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

const Dashboard = () => {
  const { data: stats, isLoading } = useStats();
  const [recentPage, setRecentPage] = useState(1);
  const itemsPerPage = 5;

  if (isLoading) return <div className="p-8"><Skeleton className="h-8 w-48 mb-6" /><div className="grid grid-cols-3 gap-6"><Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" /></div></div>;
  if (!stats) return null;

  // Logic Pagination Recent
  const totalRecentPages = Math.ceil(stats.recent.length / itemsPerPage);
  const currentRecent = stats.recent.slice((recentPage - 1) * itemsPerPage, recentPage * itemsPerPage);

  // Logic Card 3: New Hires This Month (Pengganti Avg Salary)
  const currentMonth = new Date().getMonth();
  const newHiresCount = stats.recent.filter(e => new Date(e.hire_date).getMonth() === currentMonth).length;

  const statCards = [
    { label: 'Total Active', value: stats.totalEmployees, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Departments', value: stats.breakdown.length, icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Growth (This Month)', value: `+${newHiresCount} New`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  // Formatter Sumbu Y (Agar tidak terpotong: 10000000 -> 10jt)
  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(0)}jt`;
    return value.toString(); // <--- FIX: Tambahkan .toString() agar selalu String
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Dashboard' }]} />

      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Executive Overview</h1>

      {/* Cards Section */}
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
        {/* CHART: Salary Distribution (Area Chart lebih cantik) */}
        <Card className="lg:col-span-2 p-6 flex flex-col h-[450px]">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800">Salary Analytics</h2>
            <p className="text-sm text-gray-500">Average salary distribution per department</p>
          </div>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.breakdown} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="department" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} dy={10} />
                
                {/* Y-AXIS FIXED: Width ditambah, formatter angka jutaan */}
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#6B7280'}} 
                  tickFormatter={formatYAxis} 
                  width={40} 
                />
                
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`Rp ${new Intl.NumberFormat('id-ID').format(value)}`, 'Avg Salary']}
                />
                <Area type="monotone" dataKey="avgSalary" stroke="#3B82F6" fillOpacity={1} fill="url(#colorSalary)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* RECENT HIRES: With Pagination */}
        <Card className="h-[450px] flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Recent Hires</h2>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{stats.recent.length} Total</span>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {currentRecent.map((emp) => (
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

          {/* Pagination Controls */}
          <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
            <button 
              onClick={() => setRecentPage(p => Math.max(1, p - 1))}
              disabled={recentPage === 1}
              className="p-1.5 hover:bg-white rounded-md disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-xs font-medium text-gray-500">
              Page {recentPage} / {totalRecentPages}
            </span>
            <button 
              onClick={() => setRecentPage(p => Math.min(totalRecentPages, p + 1))}
              disabled={recentPage === totalRecentPages}
              className="p-1.5 hover:bg-white rounded-md disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;