import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  LayoutDashboard, 
  Tag, 
  Megaphone, 
  ShoppingCart, 
  Boxes, 
  ShoppingBag, 
  ShieldCheck, 
  Flame, 
  MessageSquareCode, 
  Sparkles,
  Zap
} from 'lucide-react';
import { Header } from './components/Header';
import { ExecutiveMetrics } from './components/ExecutiveMetrics';
import { LiveAgentStream } from './components/LiveAgentStream';
import { OverviewTab } from './components/tabs/OverviewTab';
import { PricingAgentTab } from './components/tabs/PricingAgentTab';
import { MarketingAgentTab } from './components/tabs/MarketingAgentTab';
import { RetentionAgentTab } from './components/tabs/RetentionAgentTab';
import { InventoryAgentTab } from './components/tabs/InventoryAgentTab';
import { StoreCatalogTab } from './components/tabs/StoreCatalogTab';
import { ApprovalQueueTab } from './components/tabs/ApprovalQueueTab';
import { GrowthChatModal } from './components/GrowthChatModal';
import { ScenarioTriggerModal } from './components/ScenarioTriggerModal';
import { ReportModal } from './components/ReportModal';

import { 
  createInitialSwarmState, 
  AgentOrchestrator, 
  SwarmState 
} from './services/agentEngine';
import { 
  INITIAL_AGENTS, 
  INITIAL_PRODUCTS, 
  INITIAL_CAMPAIGNS, 
  INITIAL_ABANDONED_CARTS, 
  INITIAL_ACTIONS, 
  INITIAL_THOUGHTS, 
  INITIAL_METRICS, 
  CHAOS_SCENARIOS 
} from './data/initialStoreData';
import { AutonomyLevel, SimulationScenario, ActionProposal } from './types';
import { soundFx } from './services/soundEffects';

export const App: React.FC = () => {
  const [swarmState, setSwarmState] = useState<SwarmState>(() => 
    createInitialSwarmState(
      INITIAL_AGENTS,
      INITIAL_PRODUCTS,
      INITIAL_CAMPAIGNS,
      INITIAL_ABANDONED_CARTS,
      INITIAL_ACTIONS,
      INITIAL_THOUGHTS,
      INITIAL_METRICS
    )
  );

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Background Live Agent Telemetry simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate passive background micro-optimizations
      setSwarmState(prev => {
        // Random micro revenue increment occasionally
        const randomBonus = Math.random() > 0.65 ? Math.floor(Math.random() * 45) + 15 : 0;
        if (randomBonus > 0) {
          return {
            ...prev,
            metrics: {
              ...prev.metrics,
              totalRevenue: prev.metrics.totalRevenue + randomBonus,
              pricingGains: prev.metrics.pricingGains + randomBonus
            }
          };
        }
        return prev;
      });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleSetAutonomyLevel = (level: AutonomyLevel) => {
    setSwarmState(prev => ({
      ...prev,
      autonomyLevel: level
    }));
  };

  const handleExecuteProposal = (id: string) => {
    setSwarmState(prev => AgentOrchestrator.executeAction(prev, id));
  };

  const handleRejectProposal = (id: string) => {
    setSwarmState(prev => AgentOrchestrator.rejectAction(prev, id));
  };

  const handleRollbackProposal = (id: string) => {
    setSwarmState(prev => AgentOrchestrator.rollbackAction(prev, id));
  };

  const handleTriggerScenario = (scenario: SimulationScenario) => {
    setSwarmState(prev => AgentOrchestrator.triggerScenario(prev, scenario));
  };

  const handleAddProposal = (proposal: ActionProposal) => {
    setSwarmState(prev => ({
      ...prev,
      proposals: [proposal, ...prev.proposals]
    }));
  };

  const handleUpdateProductPrice = (productId: string, newPrice: number) => {
    setSwarmState(prev => {
      const newProducts = prev.products.map(p => {
        if (p.id === productId) {
          const newMargin = Math.round(((newPrice - p.cogs) / newPrice) * 1000) / 10;
          return {
            ...p,
            currentPrice: newPrice,
            margin: newMargin,
            aiTag: '✨ Price Auto-Optimized by Merchant'
          };
        }
        return p;
      });

      return {
        ...prev,
        products: newProducts,
        metrics: {
          ...prev.metrics,
          pricingGains: prev.metrics.pricingGains + 640,
          totalRevenue: prev.metrics.totalRevenue + 640
        }
      };
    });
  };

  const handleToggleCampaign = (id: string) => {
    setSwarmState(prev => ({
      ...prev,
      campaigns: prev.campaigns.map(c => {
        if (c.id === id) {
          const newStatus = c.status === 'paused' ? 'active' : 'paused';
          return { ...c, status: newStatus };
        }
        return c;
      })
    }));
  };

  const handleScaleCampaign = (id: string, deltaAmount: number) => {
    setSwarmState(prev => ({
      ...prev,
      campaigns: prev.campaigns.map(c => {
        if (c.id === id) {
          return {
            ...c,
            dailyBudget: c.dailyBudget + deltaAmount,
            status: 'scaled',
            aiRecommendation: `Scaled +$${deltaAmount}/day via Autonomous Bid Manager`
          };
        }
        return c;
      }),
      metrics: {
        ...prev.metrics,
        adEfficiencyGains: prev.metrics.adEfficiencyGains + 850,
        totalRevenue: prev.metrics.totalRevenue + 850
      }
    }));
  };

  const handleRecoverCart = (cartId: string) => {
    setSwarmState(prev => {
      let recoveredAmt = 0;
      const newCarts = prev.carts.map(c => {
        if (c.id === cartId) {
          recoveredAmt = c.totalValue * 0.9;
          return {
            ...c,
            recoveryStatus: 'recovered' as const,
            recoveredValue: recoveredAmt,
            chatSnippet: 'Customer completed order via ShopPilot WhatsApp concierge link.'
          };
        }
        return c;
      });

      return {
        ...prev,
        carts: newCarts,
        metrics: {
          ...prev.metrics,
          recoveredRevenue: prev.metrics.recoveredRevenue + recoveredAmt,
          totalRevenue: prev.metrics.totalRevenue + recoveredAmt,
          cartRecoveryRate: Math.min(65, Math.round((prev.metrics.cartRecoveryRate + 1.8) * 10) / 10)
        }
      };
    });
  };

  const handleRestockProduct = (productId: string, qty: number) => {
    setSwarmState(prev => ({
      ...prev,
      products: prev.products.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            inventory: p.inventory + qty,
            status: 'optimal' as const,
            aiTag: '✅ Stock Replenished via Automated Supplier PO'
          };
        }
        return p;
      }),
      metrics: {
        ...prev.metrics,
        inventoryHealth: Math.min(99, prev.metrics.inventoryHealth + 4)
      }
    }));
  };

  const handleSimulateCustomerPurchase = (productId: string) => {
    setSwarmState(prev => {
      let itemPrice = 0;
      const newProducts = prev.products.map(p => {
        if (p.id === productId) {
          itemPrice = p.currentPrice;
          return {
            ...p,
            inventory: Math.max(0, p.inventory - 1),
            salesVelocity: p.salesVelocity + 1
          };
        }
        return p;
      });

      return {
        ...prev,
        products: newProducts,
        metrics: {
          ...prev.metrics,
          totalRevenue: prev.metrics.totalRevenue + itemPrice
        }
      };
    });
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFx.setEnabled(next);
  };

  const pendingProposalsCount = swarmState.proposals.filter(p => p.status === 'pending_review').length;

  return (
    <div className="app-container">
      
      {/* 1. Top Navigation & Autonomy Header */}
      <Header
        autonomyLevel={swarmState.autonomyLevel}
        onSetAutonomyLevel={handleSetAutonomyLevel}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenScenarios={() => setIsScenarioModalOpen(true)}
        onOpenReport={() => setIsReportModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        pendingCount={pendingProposalsCount}
      />

      {/* 2. Executive Real-time Metrics Cockpit */}
      <ExecutiveMetrics metrics={swarmState.metrics} />

      {/* 3. Live Swarm Thought & Telemetry Stream Bar */}
      <LiveAgentStream thoughts={swarmState.thoughts} />

      {/* 4. Tab Navigation Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '4px', 
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '22px',
        overflowX: 'auto',
        paddingBottom: '2px'
      }}>
        <button
          onClick={() => { setActiveTab('overview'); soundFx.playClick(); }}
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
        >
          <LayoutDashboard size={16} />
          Growth Cockpit
        </button>

        <button
          onClick={() => { setActiveTab('pricing'); soundFx.playClick(); }}
          className={`nav-tab ${activeTab === 'pricing' ? 'active' : ''}`}
        >
          <Tag size={16} color="#06B6D4" />
          Dynamic Pricing Agent
        </button>

        <button
          onClick={() => { setActiveTab('marketing'); soundFx.playClick(); }}
          className={`nav-tab ${activeTab === 'marketing' ? 'active' : ''}`}
        >
          <Megaphone size={16} color="#6366F1" />
          Autonomous Ad Agent
        </button>

        <button
          onClick={() => { setActiveTab('retention'); soundFx.playClick(); }}
          className={`nav-tab ${activeTab === 'retention' ? 'active' : ''}`}
        >
          <ShoppingCart size={16} color="#EC4899" />
          Retention & Recovery Agent
        </button>

        <button
          onClick={() => { setActiveTab('inventory'); soundFx.playClick(); }}
          className={`nav-tab ${activeTab === 'inventory' ? 'active' : ''}`}
        >
          <Boxes size={16} color="#F59E0B" />
          Predictive Inventory Agent
        </button>

        <button
          onClick={() => { setActiveTab('catalog'); soundFx.playClick(); }}
          className={`nav-tab ${activeTab === 'catalog' ? 'active' : ''}`}
        >
          <ShoppingBag size={16} color="#10B981" />
          Store Catalog & Orders
        </button>

        <button
          onClick={() => { setActiveTab('approval'); soundFx.playClick(); }}
          className={`nav-tab ${activeTab === 'approval' ? 'active' : ''}`}
        >
          <ShieldCheck size={16} />
          Approval Queue
          {pendingProposalsCount > 0 && (
            <span style={{ 
              background: '#EF4444', 
              color: '#fff', 
              borderRadius: '9999px', 
              fontSize: '0.65rem', 
              padding: '1px 6px',
              fontWeight: 700 
            }}>
              {pendingProposalsCount}
            </span>
          )}
        </button>
      </div>

      {/* 5. Active Tab View */}
      <main>
        {activeTab === 'overview' && (
          <OverviewTab
            state={swarmState}
            onExecuteProposal={handleExecuteProposal}
            onTriggerScenario={handleTriggerScenario}
            scenarios={CHAOS_SCENARIOS}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'pricing' && (
          <PricingAgentTab
            products={swarmState.products}
            onUpdateProductPrice={handleUpdateProductPrice}
            pricingGains={swarmState.metrics.pricingGains}
          />
        )}

        {activeTab === 'marketing' && (
          <MarketingAgentTab
            campaigns={swarmState.campaigns}
            onToggleCampaign={handleToggleCampaign}
            onScaleCampaign={handleScaleCampaign}
            adEfficiencyGains={swarmState.metrics.adEfficiencyGains}
          />
        )}

        {activeTab === 'retention' && (
          <RetentionAgentTab
            carts={swarmState.carts}
            onRecoverCart={handleRecoverCart}
            recoveredRevenue={swarmState.metrics.recoveredRevenue}
            recoveryRate={swarmState.metrics.cartRecoveryRate}
          />
        )}

        {activeTab === 'inventory' && (
          <InventoryAgentTab
            products={swarmState.products}
            onRestockProduct={handleRestockProduct}
            inventoryHealth={swarmState.metrics.inventoryHealth}
          />
        )}

        {activeTab === 'catalog' && (
          <StoreCatalogTab
            products={swarmState.products}
            onSimulateCustomerPurchase={handleSimulateCustomerPurchase}
          />
        )}

        {activeTab === 'approval' && (
          <ApprovalQueueTab
            proposals={swarmState.proposals}
            onExecuteProposal={handleExecuteProposal}
            onRejectProposal={handleRejectProposal}
            onRollbackProposal={handleRollbackProposal}
          />
        )}
      </main>

      {/* Modals */}
      <GrowthChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        state={swarmState}
        onExecuteProposal={handleExecuteProposal}
        onAddProposal={handleAddProposal}
      />

      <ScenarioTriggerModal
        isOpen={isScenarioModalOpen}
        onClose={() => setIsScenarioModalOpen(false)}
        scenarios={CHAOS_SCENARIOS}
        onTriggerScenario={handleTriggerScenario}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        state={swarmState}
      />

    </div>
  );
};
export default App;
