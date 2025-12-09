import { Users, Briefcase, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';

interface StatsGridProps {
  stats: any;
  newHiresCount: number;
}

export const StatsGrid = ({ stats, newHiresCount }: StatsGridProps) => {
  const statCards = [
    { label: 'Total Active Employee', value: stats.totalEmployees, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Departments', value: stats.breakdown.length, icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Growth (Month)', value: `+${newHiresCount} New`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
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
  );
};