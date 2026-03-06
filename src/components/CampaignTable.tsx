'use client';
import { useState } from 'react';
import { Campaign, CampaignStatus } from '@/types/dashboard';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';

interface CampaignTableProps {
  campaigns: Campaign[];
  currentFilter: string;
  onFilterChange: (status: CampaignStatus | 'Todas') => void;
  isDark: boolean;
}

export const CampaignTable = ({ campaigns, currentFilter, onFilterChange, isDark }: CampaignTableProps) => {
  // 1. Estados da paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 2. Cálculos
  const totalPages = Math.ceil(campaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = campaigns.slice(startIndex, startIndex + itemsPerPage);

  
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as CampaignStatus | 'Todas';
    setCurrentPage(1);
    onFilterChange(value);
  };

  return (
    <div className="bg-second-background rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center bg-first-background">
        <h2 className="text-xl font-semibold text-second font-roboto">Campanhas</h2>
        <div className="flex items-center gap-2 border rounded-lg px-3 py-1 bg-white">
          <Filter size={14} className="text-gray-400" />
          <select 
            value={currentFilter}
            onChange={handleFilterChange}
            className="text-sm text-black-900 p-2 outline-none bg-transparent cursor-pointer"
          >
            <option value="Todas">Todos os Status</option>
            <option value="Ativa">Ativas</option>
            <option value="Pausada">Pausadas</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-xs text-primary text-gray-500 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Canal</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Investimento</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentItems.map((c) => (
              <tr key={c.id} className="text-sm transition-colors">
                <td className="px-6 py-4 font-medium text-second">{c.name}</td>
                <td className="px-6 py-4 text-gray-600 text-second">{c.channel}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[14px] font-medium ${
                    c.status === 'Ativa' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-medium text-second">
                  R$ {c.investment.toLocaleString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. Barra de Navegação da Paginação */}
      <div className="p-4 border-t flex items-center justify-between bg-first-background">
        <span className="text-sm text-gray-500">
          Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, campaigns.length)} de {campaigns.length}
        </span>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 rounded border bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border text-sm transition-colors ${
                  currentPage === page 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1 rounded border bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};