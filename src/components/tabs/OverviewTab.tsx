import React from 'react';
import { 
  Bot, 
  Tag, 
  Megaphone, 
  ShoppingCart, 
  Boxes, 
  TrendingUp, 
  ArrowUpRight, 
  ShieldCheck, 
  Flame, 
  Check, 
  Clock, 
  Sparkles,
  Zap
} from 'lucide-react';
import { SwarmState, AgentOrchestrator } from '../../services/agentEngine';
import { AgentInfo, ActionProposal, SimulationScenario, AgentId } from '../../types';
import { soundFx } from '../../services/soundEffects';

interface OverviewTabProps {
  state: SwarmState;
  onExecuteProposal: (id: string) => void;
  onTriggerScenario: (scenario: SimulationScenario) => void;
  scenarios: SimulationScenario[];
  onNavigateTab: (tabKey: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  state,
  onExecuteProposal,
  onTriggerScenario,
  scenarios,
  onNavigateTab
}) => {
  const getAgentIcon = (id: AgentId) => {
    switch (id) {
      case 'growth_commander': return <Bot size={20} color="#10B981" />;
      case 'pricing_agent': return <Tag size={20} color="#06B6D4" />;
      case 'marketing_agent': return <Megaphone size={20} color="#6366F1" />;
      case 'retention_agent': return <ShoppingCart size={20} color="#EC4899" />;
      case 'inventory_agent': return <Boxes size={20} color="#F59E0B" />;
      default: return <Bot size={20} color="#10B981" />;
    }
  };

  const pendingProposals = state.proposals.filter(p => p.status === 'pending_review');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. Multi-Agent Swarm Status Cards */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
              Active Multi-Agent Swarm
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              5 autonomous specialized agents operating concurrently across store operations
            </p>
          </div>
          <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="pulse-dot" style={{ background: '#10B981' }}></span>
            Swarm Coordination Active
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {state.agents.map((agent: AgentInfo) => (
            <div 
              key={agent.id} 
              className="glass-panel"
              style={{ 
                padding: '16px 18px', 
                borderRadius: '14px',
                borderLeft: `4px solid ${agent.color}`,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => {
                soundFx.playClick();
                if (agent.id === 'pricing_agent') onNavigateTab('pricing');
                else if (agent.id === 'marketing_agent') onNavigateTab('marketing');
                else if (agent.id === 'retention_agent') onNavigateTab('retention');
                else if (agent.id === 'inventory_agent') onNavigateTab('inventory');
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ 
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '10px', 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    {getAgentIcon(agent.id)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {agent.name}
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                      {agent.role}
                    </span>
                  </div>
                </div>

                <span style={{ 
                  fontSize: '0.68rem', 
                  fontWeight: 700, 
                  textTransform: 'uppercase', 
                  padding: '2px 8px', 
                  borderRadius: '9999px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#34D399',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                  {agent.status}
                </span>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px', minHeight: '34px', lineHeight: 1.4 }}>
                {agent.currentTask}
              </div>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                paddingTop: '10px', 
                borderTop: '1px solid var(--border-subtle)',
                fontSize: '0.75rem' 
              }}>
                <span style={{ color: 'var(--text-dim)' }}>
                  <span className="mono" style={{ color: 'var(--text-main)', fontWeight: 700 }}>{agent.actionsCount}</span> actions
                </span>
                <span className="mono" style={{ color: agent.color, fontWeight: 700 }}>
                  {agent.roiImpact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Middle Row: Revenue Growth Chart & Growth Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '18px' }}>
        
        {/* Left: Revenue Chart */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                Autonomous Revenue Uplift (24H Telemetry)
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Baseline unassisted store revenue vs AI agent-driven optimization
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-dim)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#64748B' }}></span>
                Baseline
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#34D399', fontWeight: 700 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></span>
                Agent Boosted
              </span>
            </div>
          </div>

          {/* SVG Custom Interactive Bar Chart */}
          <div style={{ height: '220px', width: '100%', position: 'relative', marginTop: '10px' }}>
            <svg viewBox="0 0 700 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="agentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#334155" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1E293B" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[40, 90, 140, 190].map(y => (
                <line key={y} x1="30" y1={y} x2="680" y2={y} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              ))}

              {/* Chart Bars */}
              {state.metrics.historicalRevenue.map((item, idx) => {
                const x = 50 + idx * 95;
                const maxVal = 28000;
                const totalHeight = (item.total / maxVal) * 160;
                const baselineHeight = (item.baseline / maxVal) * 160;
                const agentHeight = totalHeight - baselineHeight;

                return (
                  <g key={idx}>
                    {/* Baseline Bar */}
                    <rect
                      x={x}
                      y={190 - baselineHeight}
                      width="42"
                      height={baselineHeight}
                      rx="4"
                      fill="url(#baselineGradient)"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                    />
                    {/* Agent Boosted Bar (Stacked on Top) */}
                    <rect
                      x={x}
                      y={190 - totalHeight}
                      width="42"
                      height={agentHeight}
                      rx="4"
                      fill="url(#agentGradient)"
                      stroke="#34D399"
                      strokeWidth="1"
                    />

                    {/* Uplift Pill */}
                    <text
                      x={x + 21}
                      y={180 - totalHeight}
                      fill="#34D399"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="JetBrains Mono"
                    >
                      +${Math.round(item.agentDriven / 100) / 10}k
                    </text>

                    {/* Time Label */}
                    <text
                      x={x + 21}
                      y="208"
                      fill="#94A3B8"
                      fontSize="11"
                      textAnchor="middle"
                      fontFamily="Plus Jakarta Sans"
                    >
                      {item.time}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right: Agent Value Creation Breakdown */}
        <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '4px' }}>
              Swarm Value Creation Attribution
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
              Direct incremental profit generated by specialized agent sub-systems
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Category 1: Cart Recovery */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)', fontWeight: 600 }}>
                    <ShoppingCart size={14} color="#EC4899" />
                    Agentic Cart & Churn Recovery
                  </span>
                  <span className="mono" style={{ color: '#F472B6', fontWeight: 700 }}>
                    +${state.metrics.recoveredRevenue.toLocaleString()} (41%)
                  </span>
                </div>
                <div style={{ height: '7px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '41%', height: '100%', background: 'linear-gradient(90deg, #EC4899, #F472B6)', borderRadius: '4px' }}></div>
                </div>
              </div>

              {/* Category 2: Dynamic Pricing */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)', fontWeight: 600 }}>
                    <Tag size={14} color="#06B6D4" />
                    Dynamic Elasticity & Arbitrage
                  </span>
                  <span className="mono" style={{ color: '#38BDF8', fontWeight: 700 }}>
                    +${state.metrics.pricingGains.toLocaleString()} (33%)
                  </span>
                </div>
                <div style={{ height: '7px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '33%', height: '100%', background: 'linear-gradient(90deg, #06B6D4, #38BDF8)', borderRadius: '4px' }}></div>
                </div>
              </div>

              {/* Category 3: Ad Budget Efficiency */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)', fontWeight: 600 }}>
                    <Megaphone size={14} color="#6366F1" />
                    Autonomous Ad Budget Optimization
                  </span>
                  <span className="mono" style={{ color: '#818CF8', fontWeight: 700 }}>
                    +${state.metrics.adEfficiencyGains.toLocaleString()} (26%)
                  </span>
                </div>
                <div style={{ height: '7px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '26%', height: '100%', background: 'linear-gradient(90deg, #6366F1, #818CF8)', borderRadius: '4px' }}></div>
                </div>
              </div>

            </div>
          </div>

          <div style={{ 
            background: 'rgba(16, 185, 129, 0.08)', 
            border: '1px solid rgba(16, 185, 129, 0.25)', 
            borderRadius: '10px', 
            padding: '12px 16px',
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="#10B981" />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#34D399' }}>
                  Net Incremental Revenue
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Combined agent impact over baseline
                </div>
              </div>
            </div>
            <span className="mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
              +${(state.metrics.recoveredRevenue + state.metrics.pricingGains + state.metrics.adEfficiencyGains).toLocaleString()}
            </span>
          </div>

        </div>

      </div>

      {/* 3. Top High-ROI Opportunities Requiring Action or Auto-Executing */}
      <div className="glass-panel" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                High-Impact Swarm Directives
              </h3>
              {pendingProposals.length > 0 && (
                <span className="badge badge-amber">
                  {pendingProposals.length} Ready for Execution
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Proposals synthesized by agents based on real-time margin and demand telemetry
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('approval')}
            className="btn btn-secondary"
            style={{ fontSize: '0.78rem', padding: '6px 12px' }}
          >
            <ShieldCheck size={14} />
            View Complete Audit Queue ({state.proposals.length})
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {state.proposals.slice(0, 3).map((proposal: ActionProposal) => {
            const isPending = proposal.status === 'pending_review';
            const isApproved = proposal.status === 'approved' || proposal.status === 'auto_approved';

            return (
              <div 
                key={proposal.id}
                style={{ 
                  background: isPending ? 'rgba(15, 23, 42, 0.75)' : 'rgba(8, 14, 28, 0.5)', 
                  border: isPending ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '16px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '14px',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1, minWidth: '320px' }}>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '8px', 
                    background: 'rgba(255, 255, 255, 0.06)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {getAgentIcon(proposal.agentId)}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-dim)' }}>
                        {proposal.agentName}
                      </span>
                      <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                        {proposal.confidence}% Confidence
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                        {proposal.createdAt}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '3px' }}>
                      {proposal.title}
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                      {proposal.description}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>
                      Predicted Impact
                    </div>
                    <div className="mono" style={{ fontSize: '0.95rem', fontWeight: 800, color: '#34D399' }}>
                      {proposal.impact.value}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#60A5FA' }}>
                      {proposal.impact.metric}
                    </div>
                  </div>

                  {isPending && (
                    <button
                      onClick={() => onExecuteProposal(proposal.id)}
                      className="btn btn-primary"
                      style={{ fontSize: '0.8rem', padding: '8px 16px' }}
                    >
                      <Check size={14} />
                      Approve & Execute
                    </button>
                  )}

                  {isApproved && (
                    <span className="badge badge-emerald" style={{ padding: '6px 12px' }}>
                      <Check size={14} />
                      {proposal.status === 'auto_approved' ? 'Auto-Executed' : 'Executed'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Chaos Scenario Quick Triggers for Demo */}
      <div className="glass-panel-glow" style={{ padding: '22px', borderRadius: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={20} color="#F59E0B" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                Live Commerce Chaos & Growth Scenarios
              </h3>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Simulate real-world market shocks and watch the autonomous agent swarm respond in real time
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {scenarios.map((scenario: SimulationScenario) => (
            <div 
              key={scenario.id}
              style={{
                background: 'rgba(5, 9, 18, 0.75)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: '12px',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>
                    {scenario.badge}
                  </span>
                  <span className="mono" style={{ fontSize: '0.72rem', color: '#34D399', fontWeight: 700 }}>
                    {scenario.expectedRevenueImpact}
                  </span>
                </div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                  {scenario.title}
                </h4>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {scenario.description}
                </p>
              </div>

              <button
                onClick={() => onTriggerScenario(scenario)}
                className="btn btn-chaos"
                style={{ width: '100%', fontSize: '0.78rem', padding: '7px 12px' }}
              >
                <Zap size={14} />
                {scenario.triggerLabel}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
