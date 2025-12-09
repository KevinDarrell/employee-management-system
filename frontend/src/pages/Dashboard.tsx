import { useStats } from '../hooks/useEmployees';
import { Skeleton } from '../components/ui/Skeleton';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { StatsGrid } from '../components/dashboard/StatsGrid';
import { SalaryChart } from '../components/dashboard/SalaryChart';
import { RecentHires } from '../components/dashboard/RecentHires';

const Dashboard = () => {
  const { data: stats, isLoading } = useStats();

  if (isLoading) return <div className="p-8 space-y-6"><Skeleton className="h-8 w-48" /><div className="grid grid-cols-3 gap-6"><Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" /></div></div>;
  if (!stats) return null;

  const currentMonth = new Date().getMonth();
  const newHiresCount = stats.recent.filter(e => new Date(e.hire_date).getMonth() === currentMonth).length;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Dashboard' }]} />
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Executive Overview</h1>

      <StatsGrid stats={stats} newHiresCount={newHiresCount} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalaryChart data={stats.breakdown} />
        <RecentHires employees={stats.recent} />
      </div>
    </div>
  );
};

export default Dashboard;