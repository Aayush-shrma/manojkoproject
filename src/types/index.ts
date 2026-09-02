export type AutonomyLevel = 1 | 2 | 3;

export type AgentId = 
  | 'growth_commander' 
  | 'pricing_agent' 
  | 'marketing_agent' 
  | 'retention_agent' 
  | 'inventory_agent';

export type AgentStatus = 'idle' | 'analyzing' | 'optimizing' | 'executing' | 'alert';

export interface AgentInfo {
  id: AgentId;
  name: string;
  role: string;
  avatarIcon: string;
  status: AgentStatus;
  currentTask: string;
  actionsCount: number;
  roiImpact: string;
  color: string;
  badge: string;
}

export type ThoughtType = 'observation' | 'hypothesis' | 'tool_call' | 'action_taken' | 'impact';

export interface AgentThought {
  id: string;
  timestamp: string;
  agentId: AgentId;
  agentName: string;
  type: ThoughtType;
  title: string;
  details: string;
  impactMetric?: string;
  confidence: number;
  toolUsed?: string;
}

export interface CompetitorPrice {
  name: string;
  price: number;
  inStock: boolean;
  url?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Electronics' | 'Audio' | 'Wearables' | 'Apparel' | 'Home Tech';
  sku: string;
  image: string;
  currentPrice: number;
  originalPrice: number;
  cogs: number; // Cost of Goods Sold
  margin: number; // percentage
  inventory: number;
  restockLevel: number;
  salesVelocity: number; // units/day
  competitorPrices: CompetitorPrice[];
  roas: number;
  adSpendDaily: number;
  elasticity: number; // Price elasticity score
  status: 'optimal' | 'underpriced' | 'overpriced' | 'stockout_risk' | 'fatigue';
  aiTag?: string;
}

export interface AdCampaign {
  id: string;
  name: string;
  platform: 'meta' | 'google' | 'tiktok';
  status: 'active' | 'scaled' | 'paused' | 'fatigued';
  dailyBudget: number;
  spent: number;
  roas: number;
  targetRoas: number;
  ctr: number; // %
  cpa: number; // $
  conversions: number;
  creativeQuality: 'A+' | 'A' | 'B' | 'C' | 'Fatigued';
  aiRecommendation: string;
  linkedProductId: string;
  headline?: string;
  adCopy?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
}

export interface AbandonedCart {
  id: string;
  customerName: string;
  customerPhone: string;
  email: string;
  items: CartItem[];
  totalValue: number;
  abandonedMinutesAgo: number;
  intentScore: 'high' | 'medium' | 'price_sensitive' | 'shipping_sensitive';
  recoveryStatus: 'pending' | 'whatsapp_sent' | 'recovered' | 'lost';
  recoveryChannel: 'whatsapp' | 'sms' | 'email';
  dynamicDiscountOffered?: number;
  recoveredValue?: number;
  chatSnippet?: string;
}

export interface ActionImpact {
  metric: string;
  value: string;
  revenueDelta: number;
  marginDelta: number;
  riskScore: 'Low' | 'Medium' | 'High';
}

export interface ActionProposal {
  id: string;
  agentId: AgentId;
  agentName: string;
  category: 'pricing' | 'marketing' | 'retention' | 'inventory' | 'orchestration';
  title: string;
  description: string;
  reasoning: string;
  status: 'pending_review' | 'auto_approved' | 'approved' | 'rejected' | 'rolled_back';
  confidence: number;
  impact: ActionImpact;
  payload: Record<string, any>;
  createdAt: string;
  executedAt?: string;
  canRollback: boolean;
}

export interface RevenueDataPoint {
  time: string;
  baseline: number;
  agentDriven: number;
  total: number;
}

export interface StoreMetrics {
  totalRevenue: number;
  revenueUpliftPercentage: number;
  totalProfit: number;
  grossMargin: number;
  blendedRoas: number;
  cartRecoveryRate: number;
  inventoryHealth: number; // percentage
  totalAgentActions: number;
  hoursSavedToday: number;
  recoveredRevenue: number;
  pricingGains: number;
  adEfficiencyGains: number;
  historicalRevenue: RevenueDataPoint[];
}

export interface SimulationScenario {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  badge: string;
  triggerLabel: string;
  chaosEffect: string;
  agentResolution: string;
  expectedRevenueImpact: string;
}
