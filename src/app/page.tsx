'use client';
import Header from '../components/Header';
import { StatCard } from '@/components/StatCard';
import { useState, useEffect } from 'react';
import { CampaignTable } from '@/components/CampaignTable';
import { Loader2 } from 'lucide-react';
import { DashboardData, CampaignStatus, ChartData } from '@/types/dashboard'; 
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell, 
  ResponsiveContainer 
} from 'recharts';

export default function DashboardPage() {
  const COLORS = ['#d90606', '#4fe44a', '#4f46e5', '#06b6d4', '#8b5cf6', '#ec4899'];
  
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<CampaignStatus | 'Todas'>('Todas');
  const [isDark, setIsDark] = useState(false);

  
  const chartTextColor = isDark ? "#ffffff" : "#1e293b";
  const chartGridColor = isDark ? "#334155" : "#f0f0f0";

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/data');
        const json: DashboardData = await res.json();
        setData(json);
      } catch (err) {
        console.error("Erro ao carregar dados", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredCampaigns = data?.campaigns.filter(c => 
    filter === 'Todas' ? true : c.status === filter
  ) || [];

  const chartData = filteredCampaigns.reduce((acc: ChartData[], current) => {
    const existing = acc.find(item => item.channel === current.channel);
    if (existing) {
      existing.investment += current.investment;
    } else {
      acc.push({ channel: current.channel, investment: current.investment });
    }
    return acc;
  }, []);

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <Loader2 className="animate-spin text-indigo-600 mb-2" size={32} />
      <p className="text-gray-500 animate-pulse">Buscando dados...</p>
    </div>
  );

  return (
    <main className="p-4 md:p-8 w-full mx-auto space-y-8 min-h-screen bg-first-background transition-colors duration-500 overflow-x-hidden">

      <Header isDark={isDark} setIsDark={setIsDark} />  

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.metrics.map((m, i) => (
          <StatCard key={i} {...m} />
        ))}
      </div>

      {/* GRÁFICO DE CAMPANHAS - Blindado para não quebrar largura */}
      <div className="bg-second-background p-4 md:p-6 rounded-xl border border-second-background shadow-sm transition-all duration-500 w-full min-w-0">
        <h2 className="text-lg md:text-xl font-bold mb-6 text-second font-roboto">
          Investimento por Canal
        </h2>
        
        <div className="h-[350px] md:h-[400px] w-full">
          
          <ResponsiveContainer width="99%" height="100%">
            <BarChart 
              data={chartData} 
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }} 
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
              
              <XAxis 
                dataKey="channel" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: chartTextColor }} 
                interval={0}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: chartTextColor }} 
                tickFormatter={(value) => value >= 1000 ? `R$ ${value/1000}k` : `R$ ${value}`} 
              />
              <Tooltip 
                cursor={{ fill: isDark ? '#334155' : '#f8fafc' }} 
                contentStyle={{ 
                  backgroundColor: isDark ? '#1e293b' : '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                labelStyle={{ color: isDark ? '#ffffff' : '#1e293b', fontWeight: 'bold' }}
                itemStyle={{ color: isDark ? '#ffffff' : '#1e293b' }}
                formatter={(value: number | string | undefined) => {
                if (value === undefined) return ['', 'Investimento'];
                return [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Investimento'];
              }}
              />
              
              <Bar 
                dataKey="investment" 
                radius={[4, 4, 0, 0]} 
                barSize={typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 45} 
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* TABELA */}
      <CampaignTable 
        campaigns={filteredCampaigns} 
        currentFilter={filter} 
        onFilterChange={setFilter} 
        isDark={isDark}
      />
    </main>
  );
}