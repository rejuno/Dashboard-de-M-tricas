import { NextResponse } from 'next/server';

export async function GET() {
  
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const data = {
    metrics: [
      { label: 'Total de Clientes', value: '1,250', change: '+12%' },
      { label: 'Receita Mensal', value: 'R$ 45.200', change: '+8%' },
      { label: 'Taxa de Conversão', value: '3.2%', change: '-1%' },
    ],
    campaigns: [
      { id: 1, name: 'Black Friday', channel: 'Instagram', status: 'Ativa', investment: 5000 },
      { id: 2, name: 'Natal Antecipado', channel: 'Google', status: 'Pausada', investment: 3000 },
      { id: 3, name: 'Queima de Estoque', channel: 'Facebook', status: 'Ativa', investment: 1500 },
      { id: 4, name: 'Influenciadores Tech', channel: 'YouTube', status: 'Ativa', investment: 8000 },
      { id: 5, name: 'E-mail Marketing', channel: 'Newsletter', status: 'Pausada', investment: 500 },
      { id: 6, name: 'RD Summit 2026', channel: 'TikTok', status: 'Ativa', investment: 2500 },
      { id: 7, name: 'Hacktown Marketing', channel: 'Instagram', status: 'Pausada', investment: 1500 },
      { id: 8, name: 'Tendencias Web Analitycs', channel: 'Google', status: 'Ativa', investment: 3500 },
      { id: 9, name: 'Engenharia de Dados', channel: 'Facebook', status: 'Pausada', investment: 4500 },
      { id: 10, name: 'Beneficios da Cloud', channel: 'YouTube', status: 'Ativa', investment: 500 },
      { id: 11, name: 'O Poder do B.I', channel: 'Newsletter', status: 'Pausada', investment: 800 },
      { id: 12, name: 'Vantagens da Auditoria Analitica', channel: 'TikTok', status: 'Ativa', investment: 900 },
      { id: 13, name: 'O que são Deep Links e como usar', channel: 'Instagram', status: 'Pausada', investment: 1000 },
      { id: 14, name: 'Dados podem aumentar sua vendas', channel: 'Instagram', status: 'Ativa', investment: 2500 },
      { id: 15, name: '5 metricas fundamentais para o seu ecommerce', channel: 'Instagram', status: 'Pausada', investment: 2500 },
      
    ]
  };

  return NextResponse.json(data);
}