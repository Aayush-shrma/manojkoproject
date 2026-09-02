import React, { useState } from 'react';
import { 
  Terminal, 
  BrainCircuit, 
  Wrench, 
  CheckCircle2, 
  Sparkles, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  Filter 
} from 'lucide-react';
import { AgentThought, AgentId, ThoughtType } from '../types';

interface LiveAgentStreamProps {
  thoughts: AgentThought[];
}

export const LiveAgentStream: React.FC<LiveAgentStreamProps> = ({ thoughts }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentId | 'all'>('all');

  const latestThought = thoughts[0];

  const filteredThoughts = selectedAgent === 'all' 
    ? thoughts 
    : thoughts.filter(t => t.agentId === selectedAgent);

  const getThoughtIcon = (type: ThoughtType) => {
    switch (type) {
      case 'observation': return <Eye size={14} color="#38BDF8" />;
      case 'hypothesis': return <BrainCircuit size={14} color="#A78BFA" />;
      case 'tool_call': return <Wrench size={14} color="#FBBF24" />;
      case 'action_taken': return <CheckCircle2 size={14} color="#34D399" />;
      case 'impact': return <Sparkles size={14} color="#F472B6" />;
      default: return <Terminal size={14} color="#94A3B8" />;
    }
  };

  const getThoughtBadgeClass = (type: ThoughtType) => {
    switch (type) {
      case 'observation': return 'badge-cyan';
      case 'hypothesis': return 'badge-indigo';
      case 'tool_call': return 'badge-amber';
      case 'action_taken': return 'badge-emerald';
      case 'impact': return 'badge-pink';
      default: return 'badge-secondary';
    }
  };

  return (
    <div className="glass-panel" style={{ marginBottom: '22px', overflow: 'hidden' }}>
      
      {/* Ticker Bar */}
      <div style={{ 
        padding: '12px 20px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        background: 'rgba(8, 14, 28, 0.95)',
        borderBottom: isExpanded ? '1px solid var(--border-subtle)' : 'none'
      }}>
        
        {/* Left: Live indicator & Latest thought */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="pulse-dot" style={{ background: '#10B981' }}></span>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Swarm Telemetry
            </span>
          </div>

          {latestThought && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <span className={`badge ${getThoughtBadgeClass(latestThought.type)}`}>
                {getThoughtIcon(latestThought.type)}
                {latestThought.type}
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                [{latestThought.agentName}] {latestThought.title}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                — {latestThought.details}
              </span>
            </div>
          )}
        </div>

        {/* Right: Expand Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            {thoughts.length} events logged
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {isExpanded ? 'Hide Trace Log' : 'Inspect Swarm Reasoning'}
          </button>
        </div>

      </div>

      {/* Expandable Reasoning Log Drawer */}
      {isExpanded && (
        <div style={{ padding: '16px 20px', background: 'rgba(5, 9, 18, 0.98)' }}>
          
          {/* Filter Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>
              <Filter size={12} /> Filter Agent:
            </span>
            <button
              onClick={() => setSelectedAgent('all')}
              className={`badge ${selectedAgent === 'all' ? 'badge-emerald' : 'badge-secondary'}`}
              style={{ cursor: 'pointer', border: 'none' }}
            >
              All Swarm
            </button>
            <button
              onClick={() => setSelectedAgent('growth_commander')}
              className={`badge ${selectedAgent === 'growth_commander' ? 'badge-emerald' : 'badge-secondary'}`}
              style={{ cursor: 'pointer', border: 'none' }}
            >
              Growth Commander
            </button>
            <button
              onClick={() => setSelectedAgent('pricing_agent')}
              className={`badge ${selectedAgent === 'pricing_agent' ? 'badge-cyan' : 'badge-secondary'}`}
              style={{ cursor: 'pointer', border: 'none' }}
            >
              Pricing Agent
            </button>
            <button
              onClick={() => setSelectedAgent('marketing_agent')}
              className={`badge ${selectedAgent === 'marketing_agent' ? 'badge-indigo' : 'badge-secondary'}`}
              style={{ cursor: 'pointer', border: 'none' }}
            >
              Marketing & Ad Agent
            </button>
            <button
              onClick={() => setSelectedAgent('retention_agent')}
              className={`badge ${selectedAgent === 'retention_agent' ? 'badge-pink' : 'badge-secondary'}`}
              style={{ cursor: 'pointer', border: 'none' }}
            >
              Retention Agent
            </button>
            <button
              onClick={() => setSelectedAgent('inventory_agent')}
              className={`badge ${selectedAgent === 'inventory_agent' ? 'badge-amber' : 'badge-secondary'}`}
              style={{ cursor: 'pointer', border: 'none' }}
            >
              Inventory Agent
            </button>
          </div>

          {/* Events Stream List */}
          <div style={{ 
            maxHeight: '320px', 
            overflowY: 'auto', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px',
            paddingRight: '6px'
          }}>
            {filteredThoughts.map(t => (
              <div 
                key={t.id} 
                style={{ 
                  background: 'rgba(15, 23, 42, 0.65)', 
                  border: '1px solid rgba(255, 255, 255, 0.05)', 
                  borderRadius: '8px', 
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ marginTop: '2px' }}>
                    {getThoughtIcon(t.type)}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                      <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                        {t.timestamp}
                      </span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                        {t.agentName}
                      </span>
                      <span className={`badge ${getThoughtBadgeClass(t.type)}`} style={{ fontSize: '0.65rem' }}>
                        {t.type}
                      </span>
                      {t.toolUsed && (
                        <span className="mono" style={{ fontSize: '0.68rem', color: '#FBBF24', background: 'rgba(245, 158, 11, 0.1)', padding: '1px 6px', borderRadius: '4px' }}>
                          tool: {t.toolUsed}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {t.title}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.4 }}>
                      {t.details}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 700, background: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                    {t.confidence}% conf
                  </span>
                  {t.impactMetric && (
                    <div className="mono" style={{ fontSize: '0.75rem', color: '#F472B6', fontWeight: 700, marginTop: '4px' }}>
                      {t.impactMetric}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
