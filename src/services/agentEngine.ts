import { 
  Product, 
  AdCampaign, 
  AbandonedCart, 
  AgentInfo, 
  ActionProposal, 
  AgentThought, 
  StoreMetrics, 
  AutonomyLevel,
  AgentId,
  SimulationScenario
} from '../types';
import { soundFx } from './soundEffects';

export interface SwarmState {
  autonomyLevel: AutonomyLevel;
  agents: AgentInfo[];
  products: Product[];
  campaigns: AdCampaign[];
  carts: AbandonedCart[];
  proposals: ActionProposal[];
  thoughts: AgentThought[];
  metrics: StoreMetrics;
  activeScenario: SimulationScenario | null;
  isSimulating: boolean;
}

export function createInitialSwarmState(
  initialAgents: AgentInfo[],
  initialProducts: Product[],
  initialCampaigns: AdCampaign[],
  initialCarts: AbandonedCart[],
  initialActions: ActionProposal[],
  initialThoughts: AgentThought[],
  initialMetrics: StoreMetrics
): SwarmState {
  return {
    autonomyLevel: 2, // Default to Semi-Autonomous Guardrails
    agents: initialAgents,
    products: initialProducts,
    campaigns: initialCampaigns,
    carts: initialCarts,
    proposals: initialActions,
    thoughts: initialThoughts,
    metrics: initialMetrics,
    activeScenario: null,
    isSimulating: false
  };
}

// Generate unique ID helper
function generateId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
}

// Get formatted current time
function getCurrentTime(): string {
  const now = new Date();
  return now.toTimeString().split(' ')[0];
}

// Multi-Agent Swarm Orchestrator Logic
export class AgentOrchestrator {
  // Execute an action proposal
  static executeAction(
    state: SwarmState, 
    proposalId: string, 
    isAutoApproved: boolean = false
  ): SwarmState {
    const proposalIndex = state.proposals.findIndex(p => p.id === proposalId);
    if (proposalIndex === -1) return state;

    const proposal = state.proposals[proposalIndex];
    if (proposal.status === 'approved' || proposal.status === 'auto_approved') return state;

    const newProposals = [...state.proposals];
    newProposals[proposalIndex] = {
      ...proposal,
      status: isAutoApproved ? 'auto_approved' : 'approved',
      executedAt: 'Just now'
    };

    let newProducts = [...state.products];
    let newCampaigns = [...state.campaigns];
    let newCarts = [...state.carts];
    let newMetrics = { ...state.metrics };

    // Apply payload effects
    if (proposal.category === 'pricing' && proposal.payload.productId) {
      newProducts = newProducts.map(p => {
        if (p.id === proposal.payload.productId) {
          const newPrice = proposal.payload.newPrice || p.currentPrice;
          const newMargin = Math.round(((newPrice - p.cogs) / newPrice) * 1000) / 10;
          return {
            ...p,
            currentPrice: newPrice,
            margin: newMargin,
            status: 'optimal' as const,
            aiTag: '✨ Price Auto-Optimized by Agent'
          };
        }
        return p;
      });
      newMetrics.pricingGains += proposal.impact.revenueDelta;
      newMetrics.totalRevenue += proposal.impact.revenueDelta;
      newMetrics.grossMargin = Math.min(85, Math.round((newMetrics.grossMargin + 0.3) * 10) / 10);
    } 
    else if (proposal.category === 'marketing') {
      if (proposal.payload.pauseCampaignId) {
        newCampaigns = newCampaigns.map(c => {
          if (c.id === proposal.payload.pauseCampaignId) {
            return { ...c, status: 'paused' as const, aiRecommendation: 'Paused by Agent due to creative fatigue' };
          }
          if (c.id === proposal.payload.scaleCampaignId) {
            return { 
              ...c, 
              status: 'scaled' as const, 
              dailyBudget: c.dailyBudget + (proposal.payload.amount || 200),
              aiRecommendation: 'Scaled +$250/day via budget rebalancer'
            };
          }
          return c;
        });
      }
      newMetrics.adEfficiencyGains += proposal.impact.revenueDelta;
      newMetrics.totalRevenue += proposal.impact.revenueDelta;
      newMetrics.blendedRoas = Math.round((newMetrics.blendedRoas + 0.15) * 100) / 100;
    }
    else if (proposal.category === 'retention' && proposal.payload.cartId) {
      newCarts = newCarts.map(c => {
        if (c.id === proposal.payload.cartId) {
          return {
            ...c,
            recoveryStatus: 'recovered' as const,
            recoveredValue: c.totalValue * (1 - (proposal.payload.discount || 0) / 100),
            chatSnippet: `Order recovered via dynamic incentive ${proposal.payload.code || 'AGENT_VIP'}!`
          };
        }
        return c;
      });
      newMetrics.recoveredRevenue += proposal.impact.revenueDelta;
      newMetrics.totalRevenue += proposal.impact.revenueDelta;
      newMetrics.cartRecoveryRate = Math.min(65, Math.round((newMetrics.cartRecoveryRate + 2.1) * 10) / 10);
    }
    else if (proposal.category === 'inventory' && proposal.payload.productId) {
      newProducts = newProducts.map(p => {
        if (p.id === proposal.payload.productId) {
          return {
            ...p,
            inventory: p.inventory + (proposal.payload.qty || 100),
            status: 'optimal' as const,
            aiTag: '✅ Stock Replenished (PO Auto-Drafted)'
          };
        }
        return p;
      });
      newMetrics.inventoryHealth = Math.min(99, newMetrics.inventoryHealth + 3);
    }

    newMetrics.totalAgentActions += 1;
    newMetrics.hoursSavedToday = Math.round((newMetrics.hoursSavedToday + 0.4) * 10) / 10;

    // Add celebration sound and thought log
    soundFx.playSuccess();

    const newThought: AgentThought = {
      id: generateId('th'),
      timestamp: getCurrentTime(),
      agentId: proposal.agentId,
      agentName: proposal.agentName,
      type: 'action_taken',
      title: `Action Executed: ${proposal.title}`,
      details: `Applied payload changes. Impact: ${proposal.impact.value} (${proposal.impact.metric}).`,
      confidence: proposal.confidence,
      impactMetric: proposal.impact.value
    };

    return {
      ...state,
      proposals: newProposals,
      products: newProducts,
      campaigns: newCampaigns,
      carts: newCarts,
      metrics: newMetrics,
      thoughts: [newThought, ...state.thoughts.slice(0, 49)]
    };
  }

  // Reject a proposal
  static rejectAction(state: SwarmState, proposalId: string): SwarmState {
    const newProposals = state.proposals.map(p => {
      if (p.id === proposalId) {
        return { ...p, status: 'rejected' as const };
      }
      return p;
    });

    const proposal = state.proposals.find(p => p.id === proposalId);
    const newThought: AgentThought = {
      id: generateId('th'),
      timestamp: getCurrentTime(),
      agentId: proposal ? proposal.agentId : 'growth_commander',
      agentName: proposal ? proposal.agentName : 'Growth Commander AI',
      type: 'observation',
      title: `Action Dismissed: ${proposal?.title || 'Proposal'}`,
      details: 'Merchant rejected the proposal. Agent updating reinforcement model constraints.',
      confidence: 90
    };

    soundFx.playClick();

    return {
      ...state,
      proposals: newProposals,
      thoughts: [newThought, ...state.thoughts.slice(0, 49)]
    };
  }

  // Rollback an executed action
  static rollbackAction(state: SwarmState, proposalId: string): SwarmState {
    const proposal = state.proposals.find(p => p.id === proposalId);
    if (!proposal || (proposal.status !== 'approved' && proposal.status !== 'auto_approved')) {
      return state;
    }

    const newProposals = state.proposals.map(p => {
      if (p.id === proposalId) {
        return { ...p, status: 'rolled_back' as const, executedAt: undefined };
      }
      return p;
    });

    let newProducts = [...state.products];
    let newMetrics = { ...state.metrics };

    if (proposal.category === 'pricing' && proposal.payload.productId) {
      newProducts = newProducts.map(p => {
        if (p.id === proposal.payload.productId) {
          const oldPrice = proposal.payload.oldPrice || p.originalPrice;
          const oldMargin = Math.round(((oldPrice - p.cogs) / oldPrice) * 1000) / 10;
          return {
            ...p,
            currentPrice: oldPrice,
            margin: oldMargin,
            aiTag: '↩️ Price Rolled Back to Previous Baseline'
          };
        }
        return p;
      });
      newMetrics.totalRevenue -= proposal.impact.revenueDelta;
      newMetrics.pricingGains -= proposal.impact.revenueDelta;
    }

    const newThought: AgentThought = {
      id: generateId('th'),
      timestamp: getCurrentTime(),
      agentId: proposal.agentId,
      agentName: proposal.agentName,
      type: 'action_taken',
      title: `Rollback Executed: ${proposal.title}`,
      details: 'Restored previous state parameters following merchant instruction.',
      confidence: 95
    };

    soundFx.playAlert();

    return {
      ...state,
      proposals: newProposals,
      products: newProducts,
      metrics: newMetrics,
      thoughts: [newThought, ...state.thoughts.slice(0, 49)]
    };
  }

  // Trigger one of the 5 interactive Chaos Scenarios
  static triggerScenario(state: SwarmState, scenario: SimulationScenario): SwarmState {
    soundFx.playAlert();

    let newProducts = [...state.products];
    let newCampaigns = [...state.campaigns];
    let newCarts = [...state.carts];
    let newProposals = [...state.proposals];
    const newThoughts: AgentThought[] = [];

    const ts = getCurrentTime();

    if (scenario.id === 'scenario-1') {
      // Competitor Price War
      newProducts = newProducts.map(p => {
        if (p.id === 'prod-1') {
          return {
            ...p,
            competitorPrices: [
              { name: 'Amazon (Bose rival)', price: 159.00, inStock: true },
              { name: 'BestBuy (Sony rival)', price: 154.99, inStock: true }
            ],
            status: 'overpriced' as const,
            aiTag: '💥 Rival Price War Detected (-$40.00)'
          };
        }
        return p;
      });

      const newProposal: ActionProposal = {
        id: generateId('act'),
        agentId: 'pricing_agent',
        agentName: 'Dynamic Pricing Agent',
        category: 'pricing',
        title: 'Counter Competitor Price Drop with Gift Bundle Strategy',
        description: 'Amazon dropped rival headphone price to $159.00. Rather than destroying margin by racing to the bottom, maintain $189.00 price and attach free $64 MagSafe PowerBank gift.',
        reasoning: 'Protects brand equity and $127/unit gross profit while delivering $253 perceived value to customer. Estimated conversion lift +34%.',
        status: state.autonomyLevel === 3 ? 'auto_approved' : 'pending_review',
        confidence: 97,
        impact: {
          metric: 'Margin Preserved',
          value: '+$4,820 Revenue',
          revenueDelta: 4820,
          marginDelta: 4.1,
          riskScore: 'Low'
        },
        payload: { productId: 'prod-1', bundledGiftId: 'prod-7', bundleDiscount: 0 },
        createdAt: 'Just now',
        canRollback: true
      };

      newProposals.unshift(newProposal);

      newThoughts.push({
        id: generateId('th'),
        timestamp: ts,
        agentId: 'pricing_agent',
        agentName: 'Dynamic Pricing Agent',
        type: 'observation',
        title: 'Competitor Price War Triggered',
        details: 'Scraper detected 22% price drop on Bose & Sony rival ASINs. Immediate margin risk calculated at -$6,200/wk if unmitigated.',
        confidence: 99
      });

      newThoughts.push({
        id: generateId('th'),
        timestamp: ts,
        agentId: 'growth_commander',
        agentName: 'Growth Commander AI',
        type: 'hypothesis',
        title: 'Value-Add Bundle Strategy Formulated',
        details: 'Formulated non-destructive bundle defense: retain $189 price point and bundle high-inventory MagSafe PowerBank ($18 COGS).',
        confidence: 97
      });
    }
    else if (scenario.id === 'scenario-2') {
      // Viral TikTok Surge
      newCampaigns = newCampaigns.map(c => {
        if (c.id === 'camp-2' || c.id === 'camp-1') {
          return {
            ...c,
            ctr: 6.84,
            roas: 7.20,
            conversions: c.conversions + 42,
            aiRecommendation: '🔥 VIRAL SURGE: Traffic +420%. Scaling budget to capture surge.'
          };
        }
        return c;
      });

      const newProposal: ActionProposal = {
        id: generateId('act'),
        agentId: 'marketing_agent',
        agentName: 'Autonomous Ad Agent',
        category: 'marketing',
        title: 'Auto-Scale TikTok Spark Ad Budget (+$1,500/day)',
        description: 'LumixGlow Lamp TikTok UGC crossed 1.2M views. ROAS is spiking at 7.20x with conversion rate surging to 5.4%.',
        reasoning: 'Surge window is estimated at 48 hours. Increasing daily budget from $950 to $2,450 captures peak viral audience with minimal CPM inflation.',
        status: state.autonomyLevel === 3 ? 'auto_approved' : 'pending_review',
        confidence: 98,
        impact: {
          metric: 'Surge Revenue',
          value: '+$14,200',
          revenueDelta: 14200,
          marginDelta: 5.2,
          riskScore: 'Low'
        },
        payload: { campaignId: 'camp-2', budgetIncrease: 1500 },
        createdAt: 'Just now',
        canRollback: true
      };

      newProposals.unshift(newProposal);

      newThoughts.push({
        id: generateId('th'),
        timestamp: ts,
        agentId: 'marketing_agent',
        agentName: 'Autonomous Ad Agent',
        type: 'observation',
        title: 'TikTok UGC Virality Ingested',
        details: 'Pixel detected 1,850 concurrent checkout sessions originating from TikTok video ID #89218.',
        confidence: 99
      });
    }
    else if (scenario.id === 'scenario-3') {
      // Meta Ad Creative Fatigue
      newCampaigns = newCampaigns.map(c => {
        if (c.id === 'camp-4') {
          return {
            ...c,
            roas: 1.45,
            ctr: 0.62,
            cpa: 48.20,
            creativeQuality: 'Fatigued' as const,
            status: 'fatigued' as const
          };
        }
        return c;
      });

      const newProposal: ActionProposal = {
        id: generateId('act'),
        agentId: 'marketing_agent',
        agentName: 'Autonomous Ad Agent',
        category: 'marketing',
        title: 'Emergency Pause Fatigued Meta Creatives & Deploy AI Unboxing Copy',
        description: 'Veloce Carbon Wallet ad CTR decayed below 0.7% with $48 CPA. Pause dying ad set and deploy 3 fresh AI UGC angles.',
        reasoning: 'Halts $420/day ad burn immediately and redirects audience traffic to high-converting product demos.',
        status: state.autonomyLevel === 3 ? 'auto_approved' : 'pending_review',
        confidence: 96,
        impact: {
          metric: 'Ad Waste Saved',
          value: '+$3,400',
          revenueDelta: 3400,
          marginDelta: 2.4,
          riskScore: 'Low'
        },
        payload: { pauseCampaignId: 'camp-4', newHooks: ['RFID Test', 'AirTag Slot POV', 'Card Flick Demo'] },
        createdAt: 'Just now',
        canRollback: true
      };

      newProposals.unshift(newProposal);

      newThoughts.push({
        id: generateId('th'),
        timestamp: ts,
        agentId: 'marketing_agent',
        agentName: 'Autonomous Ad Agent',
        type: 'observation',
        title: 'Creative Fatigue Threshold Breached',
        details: 'ROAS dropped to 1.45x on Meta ad set #4. Cost per conversion exceeded maximum allowable threshold ($35.00).',
        confidence: 98
      });
    }
    else if (scenario.id === 'scenario-4') {
      // Flash Abandonment Wave
      const waveCarts: AbandonedCart[] = [
        {
          id: generateId('cart'),
          customerName: 'Alexander Hayes',
          customerPhone: '+1 (415) 555-0199',
          email: 'a.hayes@venture.co',
          items: [
            { productId: 'prod-1', name: 'AeroPulse ANC Wireless Headphones', price: 189.00, qty: 2 },
            { productId: 'prod-2', name: 'ApexFlow Smartwatch Pro Titanium', price: 279.00, qty: 1 }
          ],
          totalValue: 657.00,
          abandonedMinutesAgo: 2,
          intentScore: 'high',
          recoveryStatus: 'pending',
          recoveryChannel: 'whatsapp',
          chatSnippet: 'Payment gateway timeout on checkout step 3. Agent queued high-priority WhatsApp recovery.'
        },
        {
          id: generateId('cart'),
          customerName: 'Sophia Lin',
          customerPhone: '+1 (312) 555-0144',
          email: 'sophia.lin@designworks.io',
          items: [
            { productId: 'prod-3', name: 'LumixGlow Ambient Smart Lamp', price: 79.00, qty: 3 }
          ],
          totalValue: 237.00,
          abandonedMinutesAgo: 4,
          intentScore: 'price_sensitive',
          recoveryStatus: 'pending',
          recoveryChannel: 'whatsapp',
          chatSnippet: 'Customer cart abandoned after viewing shipping rate. 10% coupon generated.'
        }
      ];

      newCarts = [...waveCarts, ...newCarts];

      const newProposal: ActionProposal = {
        id: generateId('act'),
        agentId: 'retention_agent',
        agentName: 'Smart Retention Agent',
        category: 'retention',
        title: 'Execute Autonomous 1-Click WhatsApp Recovery Wave (35 Carts)',
        description: 'Gateway timeout affected 35 high-intent carts totaling $16,400. Deploy automated WhatsApp conversational concierge with instant pre-filled checkout sessions.',
        reasoning: 'Immediate outreach within 5 minutes has a 44% historical conversion rate, recovering ~$7,200 with zero human staff required.',
        status: state.autonomyLevel === 3 ? 'auto_approved' : 'pending_review',
        confidence: 95,
        impact: {
          metric: 'Recovered Sales',
          value: '+$7,216',
          revenueDelta: 7216,
          marginDelta: 3.5,
          riskScore: 'Low'
        },
        payload: { cartCount: 35, discountPct: 10, channel: 'whatsapp' },
        createdAt: 'Just now',
        canRollback: true
      };

      newProposals.unshift(newProposal);

      newThoughts.push({
        id: generateId('th'),
        timestamp: ts,
        agentId: 'retention_agent',
        agentName: 'Smart Retention Agent',
        type: 'observation',
        title: 'Checkout Gateway Timeout Ingested',
        details: 'Identified 35 dropped checkout sessions with valid customer phone/email records within last 5 minutes.',
        confidence: 96
      });
    }
    else if (scenario.id === 'scenario-5') {
      // Supply Chain Delay & Stockout Threat
      newProducts = newProducts.map(p => {
        if (p.id === 'prod-2') {
          return {
            ...p,
            inventory: 34,
            status: 'stockout_risk' as const,
            aiTag: '🚨 Severe Stockout Alert (48h remaining)'
          };
        }
        return p;
      });

      const newProposal: ActionProposal = {
        id: generateId('act'),
        agentId: 'inventory_agent',
        agentName: 'Predictive Inventory Agent',
        category: 'inventory',
        title: 'Protect Stockout Margin: Raise Price +$20 & Shift Ad Traffic to High-Stock SKU',
        description: 'Titanium Smartwatch inventory down to 34 units. Raise price from $279 to $299 to temper burn rate and divert top ad traffic to Nordic Hoodie (310 in stock).',
        reasoning: 'Extends remaining inventory lifecycle while extracting maximum gross margin (+7.1%) and maintaining 100% ad budget efficiency.',
        status: state.autonomyLevel === 3 ? 'auto_approved' : 'pending_review',
        confidence: 99,
        impact: {
          metric: 'Stock Arbitrage',
          value: '+$8,900 Margin',
          revenueDelta: 8900,
          marginDelta: 7.1,
          riskScore: 'Low'
        },
        payload: { productId: 'prod-2', newPrice: 299.00, divertAdToProductId: 'prod-4' },
        createdAt: 'Just now',
        canRollback: true
      };

      newProposals.unshift(newProposal);

      newThoughts.push({
        id: generateId('th'),
        timestamp: ts,
        agentId: 'inventory_agent',
        agentName: 'Predictive Inventory Agent',
        type: 'observation',
        title: 'Supplier Lead Time Disruption Alert',
        details: 'Supplier tracking API reported 14-day shipment delay for Titanium Smartwatch components. Current stock depletion rate is 16 units/day.',
        confidence: 99
      });
    }

    // If autonomy level 3, auto-execute the proposal immediately
    let updatedState: SwarmState = {
      ...state,
      products: newProducts,
      campaigns: newCampaigns,
      carts: newCarts,
      proposals: newProposals,
      thoughts: [...newThoughts, ...state.thoughts.slice(0, 45)],
      activeScenario: scenario,
      isSimulating: true
    };

    if (state.autonomyLevel === 3 && newProposals.length > 0) {
      updatedState = AgentOrchestrator.executeAction(updatedState, newProposals[0].id, true);
    }

    return updatedState;
  }

  // Handle Natural Language Growth Commander Chat
  static processNaturalLanguageCommand(
    state: SwarmState, 
    query: string
  ): { 
    replyText: string; 
    suggestedProposal?: ActionProposal; 
    thought?: AgentThought 
  } {
    const q = query.toLowerCase();
    const ts = getCurrentTime();

    if (q.includes('liquidate') || q.includes('clear') || q.includes('cushion') || q.includes('hoodie')) {
      const proposal: ActionProposal = {
        id: generateId('act'),
        agentId: 'growth_commander',
        agentName: 'Growth Commander AI',
        category: 'pricing',
        title: 'Flash Liquidation Bundle: Ergonomic Cushion + Ambient Lamp (-25%)',
        description: 'Bundle slow-moving Ergonomic Lumbar Cushion (710 units in stock) with viral LumixGlow Lamp for $110.00 (Regular: $147.00).',
        reasoning: 'Clears 240 units of cushion inventory within 5 days while generating $26,400 gross revenue with 58.2% blended margin.',
        status: state.autonomyLevel === 3 ? 'auto_approved' : 'pending_review',
        confidence: 94,
        impact: {
          metric: 'Inventory Cleared',
          value: '+$26,400 Rev',
          revenueDelta: 26400,
          marginDelta: 1.2,
          riskScore: 'Low'
        },
        payload: { primarySku: 'CS-LMB-008', bundleSku: 'LG-LMP-003', price: 110.00 },
        createdAt: 'Just now',
        canRollback: true
      };

      return {
        replyText: `🚀 **Growth Commander Plan Activated**: I analyzed your catalog inventory velocities. The **CloudStratus Lumbar Cushion** (710 units, 11/day velocity) is your slowest-moving SKU with high holding cost. \n\nI formulated an automated cross-sell bundle pairing it with the high-viral **LumixGlow Lamp** at a 25% bundle savings. This will liquidate ~240 units in 5 days and unlock **+$26,400 in net revenue**.`,
        suggestedProposal: proposal,
        thought: {
          id: generateId('th'),
          timestamp: ts,
          agentId: 'growth_commander',
          agentName: 'Growth Commander AI',
          type: 'hypothesis',
          title: 'Natural Language Directive Processed',
          details: `Processed merchant command: "${query}". Formulated cross-catalog liquidation bundle.`,
          confidence: 94
        }
      };
    }
    else if (q.includes('ad') || q.includes('marketing') || q.includes('tiktok') || q.includes('scale') || q.includes('roas')) {
      const proposal: ActionProposal = {
        id: generateId('act'),
        agentId: 'marketing_agent',
        agentName: 'Autonomous Ad Agent',
        category: 'marketing',
        title: 'Scale High-ROAS TikTok UGC & Pause Low ROAS Meta Creatives',
        description: 'Shift $400 daily spend from fatigued Meta Carbon Wallet ad (1.82x ROAS) to top-performing TikTok AeroPulse UGC (5.62x ROAS).',
        reasoning: 'Directly improves blended ROAS from 4.62x to 5.10x with zero additional capital requirement.',
        status: state.autonomyLevel === 3 ? 'auto_approved' : 'pending_review',
        confidence: 96,
        impact: {
          metric: 'Blended ROAS',
          value: '5.10x ROAS',
          revenueDelta: 4200,
          marginDelta: 2.6,
          riskScore: 'Low'
        },
        payload: { pauseCampaignId: 'camp-4', scaleCampaignId: 'camp-1', amount: 400 },
        createdAt: 'Just now',
        canRollback: true
      };

      return {
        replyText: `📊 **Autonomous Ad Optimization**: Found high ROAS asymmetry across your channels. \n\n- **TikTok UGC Hook** (AeroPulse ANC) is crushing at **5.62x ROAS** with only 12% audience fatigue.\n- **Meta Dynamic Ads** (Carbon Wallet) has dropped to **1.82x ROAS**.\n\nI generated a directive to shift $400/day into the winning TikTok ad set to push blended ROAS to **5.10x**.`,
        suggestedProposal: proposal,
        thought: {
          id: generateId('th'),
          timestamp: ts,
          agentId: 'marketing_agent',
          agentName: 'Autonomous Ad Agent',
          type: 'tool_call',
          title: 'Ad Budget Allocation Directive Formulated',
          details: 'Executed cross-platform ROAS variance test. Generated budget rebalance directive.',
          confidence: 96
        }
      };
    }
    else if (q.includes('price') || q.includes('pricing') || q.includes('margin') || q.includes('competitor')) {
      const proposal: ActionProposal = {
        id: generateId('act'),
        agentId: 'pricing_agent',
        agentName: 'Dynamic Pricing Agent',
        category: 'pricing',
        title: 'Automated 6.5% Price Elevation Across Premium Catalog',
        description: 'Raise prices on AeroPulse Headphones ($189 -> $199) and MagPulse Bottle ($48 -> $52) based on low price elasticity.',
        reasoning: 'Competitor stockouts and strong brand review sentiment allow margin expansion with negligible conversion impact.',
        status: state.autonomyLevel === 3 ? 'auto_approved' : 'pending_review',
        confidence: 93,
        impact: {
          metric: 'Margin Gain',
          value: '+$5,400/wk',
          revenueDelta: 5400,
          marginDelta: 4.8,
          riskScore: 'Low'
        },
        payload: { skus: ['AP-ANC-001', 'HP-MAG-005'], avgIncreasePct: 6.5 },
        createdAt: 'Just now',
        canRollback: true
      };

      return {
        replyText: `🏷️ **Dynamic Pricing Analysis**: Our price elasticity model indicates that **AeroPulse Headphones** and **HydroPure MagPulse Water Bottle** have inelastic demand curves (|e| < 1.4).\n\nRaising prices by ~6.5% will deliver an immediate **+$5,400/week margin gain** while maintaining >95% conversion velocity.`,
        suggestedProposal: proposal,
        thought: {
          id: generateId('th'),
          timestamp: ts,
          agentId: 'pricing_agent',
          agentName: 'Dynamic Pricing Agent',
          type: 'hypothesis',
          title: 'Margin Elevation Proposal Generated',
          details: 'Calculated elasticity coefficients across catalog SKUs. Formulated +6.5% price adjustment.',
          confidence: 93
        }
      };
    }
    else {
      return {
        replyText: `🤖 **ShopPilot AI Swarm Ready**: I'm actively monitoring your store telemetry across 8 products, 5 ad campaigns, and 14 competitor SKUs. \n\nHere are 3 high-impact strategic actions we can execute right now:\n1. **Liquidate slow-moving inventory**: Bundle the Ergonomic Lumbar Cushion to clear 240 units.\n2. **Capture Competitor Stockout Arbitrage**: Raise MagPulse bottle price by $4 while rival Owala is sold out.\n3. **Scale Viral TikTok UGC**: Reallocate $400/day from fatigued Meta ads into 5.62x ROAS creatives.\n\nType any command or select an action above to execute!`,
        thought: {
          id: generateId('th'),
          timestamp: ts,
          agentId: 'growth_commander',
          agentName: 'Growth Commander AI',
          type: 'observation',
          title: 'Merchant Interactive Query Answered',
          details: `Processed custom query: "${query}". Summarized top growth opportunities.`,
          confidence: 95
        }
      };
    }
  }
}
