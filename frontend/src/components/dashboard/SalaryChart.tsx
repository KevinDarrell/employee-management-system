import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';

export const SalaryChart = ({ data }: { data: any[] }) => {
  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(0)}jt`;
    return value.toString();
  };

  return (
    <Card className="lg:col-span-2 p-6 flex flex-col h-[450px]">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800">Salary Analytics</h2>
        <p className="text-sm text-gray-500">Average salary distribution per department</p>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="department" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} tickFormatter={formatYAxis} width={40} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              formatter={(value: number) => [`Rp ${new Intl.NumberFormat('id-ID').format(value)}`, 'Avg Salary']}
            />
            <Area type="monotone" dataKey="avgSalary" stroke="#3B82F6" fillOpacity={1} fill="url(#colorSalary)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};