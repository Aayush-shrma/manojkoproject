import { 
  Product, 
  AdCampaign, 
  AbandonedCart, 
  AgentInfo, 
  ActionProposal, 
  AgentThought, 
  StoreMetrics, 
  SimulationScenario 
} from '../types';

export const INITIAL_AGENTS: AgentInfo[] = [
  {
    id: 'growth_commander',
    name: 'Growth Commander AI',
    role: 'Chief Autonomous Orchestrator',
    avatarIcon: 'BrainCircuit',
    status: 'optimizing',
    currentTask: 'Synthesizing cross-agent telemetry & profit maximization targets',
    actionsCount: 428,
    roiImpact: '+$34.2k Net Rev',
    color: '#10B981',
    badge: 'ORCHESTRATOR'
  },
  {
    id: 'pricing_agent',
    name: 'Dynamic Pricing Agent',
    role: 'Elasticity & Competitor Scraping',
    avatarIcon: 'Tag',
    status: 'analyzing',
    currentTask: 'Monitoring 14 competitor SKUs & stockout arbitrage opportunities',
    actionsCount: 312,
    roiImpact: '+$14.8k Margin',
    color: '#06B6D4',
    badge: 'PRICING'
  },
  {
    id: 'marketing_agent',
    name: 'Autonomous Ad & Media Agent',
    role: 'Meta, Google & TikTok Bid Manager',
    avatarIcon: 'Megaphone',
    status: 'executing',
    currentTask: 'Rebalancing $3.8k daily budget to high-ROAS TikTok UGC cohorts',
    actionsCount: 524,
    roiImpact: '4.62x Blended ROAS',
    color: '#6366F1',
    badge: 'MARKETING'
  },
  {
    id: 'retention_agent',
    name: 'Smart Retention & Recovery Agent',
    role: 'Agentic WhatsApp/SMS CRM',
    avatarIcon: 'ShoppingCart',
    status: 'optimizing',
    currentTask: 'Negotiating personalized incentives for 18 abandoned carts',
    actionsCount: 184,
    roiImpact: '38.4% Cart Recovery',
    color: '#EC4899',
    badge: 'RETENTION'
  },
  {
    id: 'inventory_agent',
    name: 'Predictive Inventory Agent',
    role: 'Surge Forecaster & Supply Chain',
    avatarIcon: 'Boxes',
    status: 'idle',
    currentTask: 'Forecasting 14-day stock depletion velocity vs ad spend trends',
    actionsCount: 96,
    roiImpact: '0 Stockouts Avoided',
    color: '#F59E0B',
    badge: 'INVENTORY'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'AeroPulse ANC Wireless Headphones',
    category: 'Audio',
    sku: 'AP-ANC-001',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    currentPrice: 189.00,
    originalPrice: 219.00,
    cogs: 62.00,
    margin: 67.2,
    inventory: 412,
    restockLevel: 100,
    salesVelocity: 28,
    competitorPrices: [
      { name: 'Amazon (Bose rival)', price: 199.99, inStock: true },
      { name: 'BestBuy (Sony rival)', price: 179.99, inStock: false },
      { name: 'Direct TechD2C', price: 195.00, inStock: true }
    ],
    roas: 4.8,
    adSpendDaily: 620,
    elasticity: -1.4,
    status: 'optimal',
    aiTag: '🔥 Top Grossing SKU'
  },
  {
    id: 'prod-2',
    name: 'ApexFlow Smartwatch Pro Titanium',
    category: 'Wearables',
    sku: 'AF-SMW-002',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    currentPrice: 279.00,
    originalPrice: 299.00,
    cogs: 95.00,
    margin: 65.9,
    inventory: 86,
    restockLevel: 90,
    salesVelocity: 16,
    competitorPrices: [
      { name: 'Amazon Titan', price: 289.00, inStock: true },
      { name: 'Garmin Store', price: 299.99, inStock: true }
    ],
    roas: 3.9,
    adSpendDaily: 450,
    elasticity: -0.9,
    status: 'stockout_risk',
    aiTag: '⚠️ Stock Depletion in 5.3 Days'
  },
  {
    id: 'prod-3',
    name: 'LumixGlow Ambient Smart Lamp',
    category: 'Home Tech',
    sku: 'LG-LMP-003',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
    currentPrice: 79.00,
    originalPrice: 99.00,
    cogs: 22.00,
    margin: 72.1,
    inventory: 640,
    restockLevel: 150,
    salesVelocity: 34,
    competitorPrices: [
      { name: 'Amazon Basics Smart Lamp', price: 84.99, inStock: true },
      { name: 'Philips Hue Go', price: 89.99, inStock: true }
    ],
    roas: 5.4,
    adSpendDaily: 580,
    elasticity: -1.8,
    status: 'optimal',
    aiTag: '🚀 High Viral ROAS (TikTok)'
  },
  {
    id: 'prod-4',
    name: 'Nordic Aero Merino Wool Hoodie',
    category: 'Apparel',
    sku: 'NA-HOOD-004',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
    currentPrice: 124.00,
    originalPrice: 135.00,
    cogs: 38.00,
    margin: 69.3,
    inventory: 310,
    restockLevel: 80,
    salesVelocity: 14,
    competitorPrices: [
      { name: 'Vuori Hoodie', price: 128.00, inStock: true },
      { name: 'Lululemon Scuba', price: 138.00, inStock: true }
    ],
    roas: 3.2,
    adSpendDaily: 340,
    elasticity: -1.1,
    status: 'optimal',
    aiTag: '✨ High Repeat Purchase LTV'
  },
  {
    id: 'prod-5',
    name: 'HydroPure MagPulse 2.0 Water Bottle',
    category: 'Home Tech',
    sku: 'HP-MAG-005',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
    currentPrice: 48.00,
    originalPrice: 55.00,
    cogs: 12.00,
    margin: 75.0,
    inventory: 820,
    restockLevel: 200,
    salesVelocity: 42,
    competitorPrices: [
      { name: 'Owala FreeSip', price: 42.00, inStock: false },
      { name: 'Yeti Rambler', price: 50.00, inStock: true }
    ],
    roas: 4.1,
    adSpendDaily: 390,
    elasticity: -1.6,
    status: 'underpriced',
    aiTag: '📈 Competitor Stockout Arbitrage'
  },
  {
    id: 'prod-6',
    name: 'Veloce Carbon Fiber Minimal Wallet',
    category: 'Wearables',
    sku: 'VC-WAL-006',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80',
    currentPrice: 59.00,
    originalPrice: 69.00,
    cogs: 14.50,
    margin: 75.4,
    inventory: 540,
    restockLevel: 120,
    salesVelocity: 19,
    competitorPrices: [
      { name: 'The Ridge Wallet', price: 75.00, inStock: true },
      { name: 'Ekster Parliament', price: 69.00, inStock: true }
    ],
    roas: 2.1,
    adSpendDaily: 280,
    elasticity: -0.8,
    status: 'fatigue',
    aiTag: '📉 Ad Creative Fatigue Alert'
  },
  {
    id: 'prod-7',
    name: 'NovaShield MagSafe Fast PowerBank 10k',
    category: 'Electronics',
    sku: 'NS-PB-007',
    image: 'https://images.unsplash.com/photo-1609592424385-a7493a7431e7?w=600&auto=format&fit=crop&q=80',
    currentPrice: 64.00,
    originalPrice: 74.00,
    cogs: 18.00,
    margin: 71.8,
    inventory: 390,
    restockLevel: 100,
    salesVelocity: 24,
    competitorPrices: [
      { name: 'Anker MagGo', price: 69.99, inStock: true },
      { name: 'Baseus Blade', price: 59.99, inStock: true }
    ],
    roas: 4.3,
    adSpendDaily: 410,
    elasticity: -1.3,
    status: 'optimal',
    aiTag: '⚡ Bundles Well with Headphones'
  },
  {
    id: 'prod-8',
    name: 'CloudStratus Ergonomic Lumbar Cushion',
    category: 'Home Tech',
    sku: 'CS-LMB-008',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&auto=format&fit=crop&q=80',
    currentPrice: 68.00,
    originalPrice: 85.00,
    cogs: 17.00,
    margin: 75.0,
    inventory: 710,
    restockLevel: 150,
    salesVelocity: 11,
    competitorPrices: [
      { name: 'Cushion Lab', price: 76.00, inStock: true },
      { name: 'Purple Back Support', price: 89.00, inStock: true }
    ],
    roas: 2.4,
    adSpendDaily: 220,
    elasticity: -1.9,
    status: 'overpriced',
    aiTag: '🔄 Liquidation Bundle Candidate'
  }
];

export const INITIAL_CAMPAIGNS: AdCampaign[] = [
  {
    id: 'camp-1',
    name: '[TikTok UGC] AeroPulse ANC – Commute POV Hook',
    platform: 'tiktok',
    status: 'scaled',
    dailyBudget: 1250,
    spent: 840,
    roas: 5.62,
    targetRoas: 3.5,
    ctr: 3.42,
    cpa: 28.40,
    conversions: 44,
    creativeQuality: 'A+',
    aiRecommendation: 'Scale daily budget by +$350. Audience fatigue score is only 12%.',
    linkedProductId: 'prod-1',
    headline: 'POV: You turn off the entire subway noise with one tap',
    adCopy: 'Over 10,000 audiophiles switched to AeroPulse ANC. 40hr battery life & studio precision.'
  },
  {
    id: 'camp-2',
    name: '[Meta Advantage+] LumixGlow Desk Aesthetic Reel',
    platform: 'meta',
    status: 'active',
    dailyBudget: 950,
    spent: 620,
    roas: 4.88,
    targetRoas: 3.2,
    ctr: 2.85,
    cpa: 16.20,
    conversions: 38,
    creativeQuality: 'A',
    aiRecommendation: 'Expand lookalike audience to 3% tech desk enthusiasts.',
    linkedProductId: 'prod-3',
    headline: 'Transform your work setup into a cyberpunk sanctuary',
    adCopy: 'Syncs with your music, monitor, and circadian rhythm. 16M dynamic colors.'
  },
  {
    id: 'camp-3',
    name: '[Google Shopping P-Max] Smartwatch Pro Titanium',
    platform: 'google',
    status: 'active',
    dailyBudget: 750,
    spent: 510,
    roas: 3.92,
    targetRoas: 3.0,
    ctr: 4.12,
    cpa: 68.00,
    conversions: 11,
    creativeQuality: 'B',
    aiRecommendation: 'Inventory depletion alert: slow down target ROAS to 4.2x to prevent stockout.',
    linkedProductId: 'prod-2',
    headline: 'Aerospace Titanium Smartwatch with 14-Day Battery',
    adCopy: 'Dual-frequency GPS, ECG monitor & sapphire glass. Engineered for extreme endurance.'
  },
  {
    id: 'camp-4',
    name: '[Meta Dynamic Ads] Veloce Carbon Fiber Wallet',
    platform: 'meta',
    status: 'fatigued',
    dailyBudget: 420,
    spent: 390,
    roas: 1.82,
    targetRoas: 3.0,
    ctr: 0.94,
    cpa: 32.40,
    conversions: 12,
    creativeQuality: 'Fatigued',
    aiRecommendation: 'CRITICAL: Creative fatigue detected (CTR dropped 48% in 48h). Pause and deploy AI generated unboxing angle.',
    linkedProductId: 'prod-6',
    headline: 'Slim your pocket by 80%',
    adCopy: 'Holds 12 cards with RFID blocking and instant ejection.'
  },
  {
    id: 'camp-5',
    name: '[TikTok Spark Ads] HydroPure MagPulse Trend',
    platform: 'tiktok',
    status: 'active',
    dailyBudget: 580,
    spent: 320,
    roas: 4.45,
    targetRoas: 3.0,
    ctr: 3.10,
    cpa: 10.80,
    conversions: 30,
    creativeQuality: 'A',
    aiRecommendation: 'Competitor Owala is out of stock. Increase budget by $200 to capture competitor search surge.',
    linkedProductId: 'prod-5',
    headline: 'The magnetic water bottle that attaches to gym equipment',
    adCopy: 'Cold for 24 hours. Built-in MagSafe phone mount for filming workouts.'
  }
];

export const INITIAL_ABANDONED_CARTS: AbandonedCart[] = [
  {
    id: 'cart-1092',
    customerName: 'Marcus Vance',
    customerPhone: '+1 (415) 892-3401',
    email: 'marcus.vance@techlead.io',
    items: [
      { productId: 'prod-1', name: 'AeroPulse ANC Wireless Headphones', price: 189.00, qty: 1 },
      { productId: 'prod-7', name: 'NovaShield MagSafe PowerBank', price: 64.00, qty: 1 }
    ],
    totalValue: 253.00,
    abandonedMinutesAgo: 14,
    intentScore: 'high',
    recoveryStatus: 'whatsapp_sent',
    recoveryChannel: 'whatsapp',
    dynamicDiscountOffered: 10,
    chatSnippet: 'Hey Marcus! Noticed you were looking at the AeroPulse ANC + MagSafe bundle. Agent reserved your pair + unlocked free express shipping + 10% code: PULSE10.'
  },
  {
    id: 'cart-1093',
    customerName: 'Elena Rostova',
    customerPhone: '+1 (212) 440-1928',
    email: 'elena.design@studio.co',
    items: [
      { productId: 'prod-3', name: 'LumixGlow Ambient Smart Lamp', price: 79.00, qty: 2 },
      { productId: 'prod-4', name: 'Nordic Aero Merino Wool Hoodie', price: 124.00, qty: 1 }
    ],
    totalValue: 282.00,
    abandonedMinutesAgo: 38,
    intentScore: 'price_sensitive',
    recoveryStatus: 'recovered',
    recoveryChannel: 'whatsapp',
    dynamicDiscountOffered: 12,
    recoveredValue: 248.16,
    chatSnippet: 'Elena redeemed dynamic code GLOW12 for $248.16 order. Profit margin maintained at 64.2%.'
  },
  {
    id: 'cart-1094',
    customerName: 'David Chen',
    customerPhone: '+1 (310) 902-8841',
    email: 'david.c@fintechpulse.com',
    items: [
      { productId: 'prod-2', name: 'ApexFlow Smartwatch Pro Titanium', price: 279.00, qty: 1 }
    ],
    totalValue: 279.00,
    abandonedMinutesAgo: 7,
    intentScore: 'shipping_sensitive',
    recoveryStatus: 'pending',
    recoveryChannel: 'whatsapp',
    chatSnippet: 'Customer reached checkout shipping step then bounced. Agent preparing zero-friction free overnight delivery offer.'
  },
  {
    id: 'cart-1095',
    customerName: 'Sarah Jenkins',
    customerPhone: '+1 (650) 338-7102',
    email: 's.jenkins@stanford.edu',
    items: [
      { productId: 'prod-5', name: 'HydroPure MagPulse Water Bottle', price: 48.00, qty: 2 }
    ],
    totalValue: 96.00,
    abandonedMinutesAgo: 52,
    intentScore: 'medium',
    recoveryStatus: 'whatsapp_sent',
    recoveryChannel: 'sms',
    dynamicDiscountOffered: 8,
    chatSnippet: 'Sent SMS reminder with 8% incentive. Customer opened link 2 mins ago.'
  }
];

export const INITIAL_ACTIONS: ActionProposal[] = [
  {
    id: 'act-101',
    agentId: 'pricing_agent',
    agentName: 'Dynamic Pricing Agent',
    category: 'pricing',
    title: 'Arbitrage Price Surge: HydroPure MagPulse (+$4.00)',
    description: 'Competitor Owala FreeSip is confirmed out-of-stock across Amazon & Target. Demand elasticity allows increasing price from $48 to $52 while retaining 96% conversion rate.',
    reasoning: 'Stockout detected on rival ASIN B09XYZ. Our inventory is healthy (820 units). Expected margin gain +$1,640 over next 7 days.',
    status: 'pending_review',
    confidence: 94,
    impact: {
      metric: 'Gross Margin',
      value: '+$1,640/wk',
      revenueDelta: 1640,
      marginDelta: 3.2,
      riskScore: 'Low'
    },
    payload: { productId: 'prod-5', newPrice: 52.00, oldPrice: 48.00 },
    createdAt: '3 mins ago',
    canRollback: true
  },
  {
    id: 'act-102',
    agentId: 'marketing_agent',
    agentName: 'Autonomous Ad Agent',
    category: 'marketing',
    title: 'Pause Fatigued Ad & Deploy High-Converting Video Variant',
    description: 'Meta Dynamic ad for Carbon Wallet has ROAS of 1.82 (Target: 3.0). Pause creative and reallocate $250/day into top-performing TikTok AeroPulse hook.',
    reasoning: 'Ad creative CTR dropped 48% over 48h. Moving spend to AeroPulse TikTok ad with proven 5.62x ROAS will generate immediate revenue lift.',
    status: 'pending_review',
    confidence: 96,
    impact: {
      metric: 'Blended ROAS',
      value: '+0.34x ROAS',
      revenueDelta: 2450,
      marginDelta: 1.8,
      riskScore: 'Low'
    },
    payload: { pauseCampaignId: 'camp-4', scaleCampaignId: 'camp-1', amount: 250 },
    createdAt: '8 mins ago',
    canRollback: true
  },
  {
    id: 'act-103',
    agentId: 'inventory_agent',
    agentName: 'Predictive Inventory Agent',
    category: 'inventory',
    title: 'Draft Urgent Purchase Order: Smartwatch Titanium (150 units)',
    description: 'Current stock is 86 units. At current sales velocity of 16 units/day, stockout will occur in 5.3 days. Lead time is 9 days.',
    reasoning: 'Prevent $24,800 in lost revenue by auto-drafting supplier replenishment order to Foxconn Precision Logistics.',
    status: 'pending_review',
    confidence: 98,
    impact: {
      metric: 'Revenue Protected',
      value: '+$24,800',
      revenueDelta: 24800,
      marginDelta: 0,
      riskScore: 'Low'
    },
    payload: { productId: 'prod-2', qty: 150, supplier: 'Foxconn Precision', leadDays: 9 },
    createdAt: '15 mins ago',
    canRollback: true
  },
  {
    id: 'act-104',
    agentId: 'retention_agent',
    agentName: 'Smart Retention Agent',
    category: 'retention',
    title: 'Deploy Dynamic Free-Shipping Incentive for David Chen ($279 cart)',
    description: 'Customer cart contains Smartwatch Titanium. Abandoned at shipping step. Customer LTV model projects $890 lifetime value.',
    reasoning: 'Dynamic cost of free express shipping is $11.50, unlocking $279 immediate order with 65.9% gross margin.',
    status: 'auto_approved',
    confidence: 91,
    impact: {
      metric: 'Recovered Sale',
      value: '+$279.00',
      revenueDelta: 279,
      marginDelta: 0.8,
      riskScore: 'Low'
    },
    payload: { cartId: 'cart-1094', code: 'EXPRESSVIP', discount: 0, freeShipping: true },
    createdAt: '22 mins ago',
    executedAt: '20 mins ago',
    canRollback: true
  },
  {
    id: 'act-105',
    agentId: 'growth_commander',
    agentName: 'Growth Commander AI',
    category: 'orchestration',
    title: 'Cross-Sell Bundle Activated: AeroPulse ANC + MagSafe PowerBank',
    description: 'Automated 1-click checkout cross-sell deployed. Bundle discount 12% offered when cart contains AeroPulse Headphones.',
    reasoning: 'Increases Average Order Value (AOV) from $189.00 to $238.40 while clearing surplus PowerBank inventory.',
    status: 'auto_approved',
    confidence: 95,
    impact: {
      metric: 'AOV Uplift',
      value: '+26.1% AOV',
      revenueDelta: 4120,
      marginDelta: 2.1,
      riskScore: 'Low'
    },
    payload: { primaryProductId: 'prod-1', bundledProductId: 'prod-7', discountPct: 12 },
    createdAt: '1 hour ago',
    executedAt: '58 mins ago',
    canRollback: true
  }
];

export const INITIAL_THOUGHTS: AgentThought[] = [
  {
    id: 'th-1',
    timestamp: '18:49:12',
    agentId: 'growth_commander',
    agentName: 'Growth Commander AI',
    type: 'observation',
    title: 'Global Telemetry Ingest Complete',
    details: 'Ingested 1,840 session events, 4 ad platform webhooks, and 14 competitor SKU price changes over the past 60 minutes.',
    confidence: 99
  },
  {
    id: 'th-2',
    timestamp: '18:49:18',
    agentId: 'pricing_agent',
    agentName: 'Dynamic Pricing Agent',
    type: 'hypothesis',
    title: 'Stockout Arbitrage Opportunity Identified',
    details: 'Competitor Owala FreeSip ran out of stock on Amazon. Price elasticity on HydroPure MagPulse indicates room for +$4.00 increase with <4% demand decay.',
    confidence: 94,
    toolUsed: 'CompetitorScraperAPI & PriceElasticityModel'
  },
  {
    id: 'th-3',
    timestamp: '18:49:25',
    agentId: 'marketing_agent',
    agentName: 'Autonomous Ad Agent',
    type: 'tool_call',
    title: 'Meta & TikTok Bid Optimization Triggered',
    details: 'Executed tool ad_manager.reallocate_budget(source="camp-4", target="camp-1", amount=250). AeroPulse ROAS is 5.62x.',
    confidence: 96,
    toolUsed: 'MetaMarketingAPI / TikTokAdsEngine'
  },
  {
    id: 'th-4',
    timestamp: '18:49:31',
    agentId: 'retention_agent',
    agentName: 'Smart Retention Agent',
    type: 'action_taken',
    title: 'WhatsApp Conversational Recovery Sent',
    details: 'Delivered hyper-personalized WhatsApp message with dynamic discount PULSE10 to Marcus Vance ($253.00 cart).',
    confidence: 92,
    toolUsed: 'WhatsAppBusinessAgent & DynamicCouponEngine'
  },
  {
    id: 'th-5',
    timestamp: '18:49:36',
    agentId: 'growth_commander',
    agentName: 'Growth Commander AI',
    type: 'impact',
    title: 'Live Net Revenue Uplift Metric Updated',
    details: 'Autonomous swarm has generated +$3,842.16 net revenue in the last 4 hours across 8 active SKU optimizations.',
    impactMetric: '+$3,842.16 / 4hrs',
    confidence: 98
  }
];

export const INITIAL_METRICS: StoreMetrics = {
  totalRevenue: 148290.00,
  revenueUpliftPercentage: 24.8,
  totalProfit: 58940.00,
  grossMargin: 68.4,
  blendedRoas: 4.62,
  cartRecoveryRate: 38.4,
  inventoryHealth: 94,
  totalAgentActions: 1482,
  hoursSavedToday: 18.5,
  recoveredRevenue: 18450.00,
  pricingGains: 14820.00,
  adEfficiencyGains: 11940.00,
  historicalRevenue: [
    { time: '00:00', baseline: 4200, agentDriven: 1100, total: 5300 },
    { time: '04:00', baseline: 3100, agentDriven: 850, total: 3950 },
    { time: '08:00', baseline: 7800, agentDriven: 2400, total: 10200 },
    { time: '12:00', baseline: 12400, agentDriven: 4100, total: 16500 },
    { time: '16:00', baseline: 16800, agentDriven: 5800, total: 22600 },
    { time: '20:00', baseline: 14200, agentDriven: 4900, total: 19100 },
    { time: 'Now', baseline: 18900, agentDriven: 6800, total: 25700 }
  ]
};

export const CHAOS_SCENARIOS: SimulationScenario[] = [
  {
    id: 'scenario-1',
    title: 'Competitor Flash Price War (-22% Under-cut)',
    category: 'Dynamic Pricing & Margins',
    description: 'Amazon rival cuts Bose/Sony rival headphones by $40. Pricing agent detects price war and formulates optimal bundle defence.',
    iconName: 'TrendingDown',
    badge: 'PRICING CHAOS',
    triggerLabel: 'Simulate Competitor Price War',
    chaosEffect: 'Competitor price drops from $199 to $159 on primary audio category.',
    agentResolution: 'Pricing agent protects margin by holding price at $189 while activating free $64 MagSafe PowerBank gift bundle. Conversion spikes +34% without sacrificing price integrity.',
    expectedRevenueImpact: '+$4,820 Revenue / Zero Margin Destruction'
  },
  {
    id: 'scenario-2',
    title: 'Viral TikTok UGC Spike (+420% Traffic Surge)',
    category: 'Autonomous Ad & Traffic',
    description: 'A creator video featuring the LumixGlow Lamp crosses 1.2M views on TikTok. Traffic surges with high purchase intent.',
    iconName: 'Zap',
    badge: 'TRAFFIC SURGE',
    triggerLabel: 'Simulate TikTok Viral Surge',
    chaosEffect: 'Concurrent live visitors jump from 140 to 1,850 in 3 minutes.',
    agentResolution: 'Autonomous Ad Agent instantly scales winning TikTok Spark Ad budget by +$1,500, while Inventory Agent reserves 400 lamp units and prioritizes express warehouse fulfillment.',
    expectedRevenueImpact: '+$14,200 Surge Revenue / 5.8x ROAS'
  },
  {
    id: 'scenario-3',
    title: 'Meta Ad Creative Fatigue Alert (ROAS < 2.0x)',
    category: 'Ad Spend Optimization',
    description: 'Ad frequency hits 4.8 on top Carbon Wallet campaign. Cost per acquisition rises by +68%.',
    iconName: 'AlertTriangle',
    badge: 'AD FATIGUE',
    triggerLabel: 'Simulate Ad Creative Fatigue',
    chaosEffect: 'Meta Ad ROAS drops from 4.1x down to 1.7x with negative ROI.',
    agentResolution: 'Ad Agent autonomously pauses fatigued creatives, drafts 3 AI variations with new problem-solution hooks, and reallocates $600 to high-performing Google P-Max campaigns.',
    expectedRevenueImpact: '+$3,400 Ad Waste Eliminated / ROAS Restored to 4.4x'
  },
  {
    id: 'scenario-4',
    title: 'Flash Abandonment Wave ($16,400 in Carts)',
    category: 'Cart Recovery & CRM',
    description: 'A payment gateway timeout in EU/US region causes 35 high-value shopping carts to be abandoned simultaneously.',
    iconName: 'ShoppingCart',
    badge: 'CART CRISIS',
    triggerLabel: 'Simulate Abandoned Cart Wave',
    chaosEffect: '35 checkout sessions drop off with $16,400 total value at risk.',
    agentResolution: 'Retention Agent launches autonomous multi-channel recovery: dynamic WhatsApp messages with 1-click Apple Pay recovery links and 10% dynamic coupon codes. Recovers 44% of carts in 20 minutes.',
    expectedRevenueImpact: '+$7,216 Direct Revenue Recovered'
  },
  {
    id: 'scenario-5',
    title: 'Supply Chain Delay & Stockout Threat',
    category: 'Predictive Inventory',
    description: 'Supplier delays Titanium Smartwatch shipment by 14 days. Current inventory has only 4 days of stock remaining.',
    iconName: 'PackageX',
    badge: 'SUPPLY SHOCK',
    triggerLabel: 'Simulate Stockout Threat',
    chaosEffect: 'Stockout timer indicates zero inventory in 96 hours with pending orders backlog.',
    agentResolution: 'Inventory Agent raises price by +$20 to manage demand curve, throttles low-margin ad sets, and autonomously drafts expedited air-freight PO to manufacturer.',
    expectedRevenueImpact: '+$8,900 Margin Arbitrage & 100% Stockout Avoidance'
  }
];
