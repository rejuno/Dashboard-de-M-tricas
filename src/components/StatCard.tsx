import { Metric } from '@/types/dashboard';

export const StatCard = ({ label, value, change, type }: Metric) => {
  const isPositive = type === 'increase';

  return (
    <div className="bg-second-background p-12 rounded-xl border border-first-background shadow-sm">
      <p className="text-xl font-medium text-second">{label}</p>
      <div className="flex items-baseline gap-2 mt-2">
        <h3 className="text-3xl font-bold text-second">{value}</h3>
        <span className={`flex items-center text-sm font-semibold text-red-600`}>
          {change}
        </span>
      </div>
    </div>
  );
};