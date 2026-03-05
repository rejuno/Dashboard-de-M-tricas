export type CampaignStatus = 'Ativa' | 'Pausada';

export interface Campaign {
  id: number;
  name: string;
  channel: string;
  status: CampaignStatus;
  investment: number;
}

export interface Metric {
  label: string;
  value: string;
  change: string;
  type: 'increase' | 'decrease';
}

export interface DashboardData {
  metrics: Metric[];
  campaigns: Campaign[];
}

export interface ChartData {
  channel: string;
  investment: number;
}
