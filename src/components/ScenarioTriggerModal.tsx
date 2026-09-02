import React from 'react';
import { 
  X, 
  Flame, 
  TrendingDown, 
  Zap, 
  AlertTriangle, 
  ShoppingCart, 
  PackageX, 
  Check, 
  ArrowRight 
} from 'lucide-react';
import { SimulationScenario } from '../types';
import { soundFx } from '../services/soundEffects';

interface ScenarioTriggerModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenarios: SimulationScenario[];
  onTriggerScenario: (scenario: SimulationScenario) => void;
}

export const ScenarioTriggerModal: React.FC<ScenarioTriggerModalProps> = ({
  isOpen,
  onClose,
  scenarios,
  onTriggerScenario
}) => {
  if (!isOpen) return null;

  const getScenarioIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingDown': return <TrendingDown size={22} color="#EF4444" />;
      case 'Zap': return <Zap size={22} color="#34D399" />;
      case 'AlertTriangle': return <AlertTriangle size={22} color="#F59E0B" />;
      case 'ShoppingCart': return <ShoppingCart size={22} color="#EC4899" />;
      case 'PackageX': return <PackageX size={22} color="#F43F5E" />;
      default: return <Flame size={22} color="#F59E0B" />;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ width: '840px', maxWidth: '95vw', padding: '24px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flame size={26} color="#F59E0B" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  Interactive E-Commerce Chaos & Shock Simulator
                </h2>
                <span className="badge badge-amber">Demo Mode</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Trigger realistic market disruptions to test and present autonomous multi-agent reactivity in real time.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Scenarios Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '560px', overflowY: 'auto' }}>
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1, minWidth: '320px' }}>
                <div style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '10px', 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {getScenarioIcon(scenario.iconName)}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>
                      {scenario.badge}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                      {scenario.category}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                    {scenario.title}
                  </h3>

                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px', lineHeight: 1.4 }}>
                    {scenario.description}
                  </p>

                  {/* Chaos vs Agent Resolution */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px', fontSize: '0.74rem' }}>
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', padding: '6px 10px', borderRadius: '6px', color: '#FCA5A5' }}>
                      <strong>Shock:</strong> {scenario.chaosEffect}
                    </div>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '6px 10px', borderRadius: '6px', color: '#86EFAC' }}>
                      <strong>Swarm Action:</strong> {scenario.agentResolution}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', minHeight: '90px' }}>
                <span className="mono" style={{ fontSize: '0.85rem', fontWeight: 800, color: '#34D399' }}>
                  {scenario.expectedRevenueImpact}
                </span>

                <button
                  onClick={() => {
                    onTriggerScenario(scenario);
                    onClose();
                  }}
                  className="btn btn-chaos"
                  style={{ fontSize: '0.8rem', padding: '8px 16px' }}
                >
                  <Zap size={14} />
                  Trigger Shock
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
