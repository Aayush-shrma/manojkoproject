import React from 'react';
import { 
  Bot, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  MessageSquareCode, 
  Flame, 
  DownloadCloud, 
  ShieldCheck, 
  Zap, 
  Radio
} from 'lucide-react';
import { AutonomyLevel } from '../types';
import { soundFx } from '../services/soundEffects';

interface HeaderProps {
  autonomyLevel: AutonomyLevel;
  onSetAutonomyLevel: (level: AutonomyLevel) => void;
  onOpenChat: () => void;
  onOpenScenarios: () => void;
  onOpenReport: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  pendingCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  autonomyLevel,
  onSetAutonomyLevel,
  onOpenChat,
  onOpenScenarios,
  onOpenReport,
  soundEnabled,
  onToggleSound,
  pendingCount
}) => {
  const handleLevelChange = (lvl: AutonomyLevel) => {
    soundFx.playLevelShift();
    onSetAutonomyLevel(lvl);
  };

  return (
    <header className="glass-panel" style={{ padding: '14px 24px', marginBottom: '20px', borderRadius: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand & Track Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ 
            width: '44px', 
            height: '44px', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, #10B981 0%, #6366F1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
          }}>
            <Bot size={26} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 800, background: 'linear-gradient(90deg, #FFFFFF, #E2E8F0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ShopPilot AI
              </h1>
              <span className="badge badge-emerald" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>
                TRACK 1: AGENTIC COMMERCE
              </span>
              <span className="badge badge-indigo" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="pulse-dot" style={{ background: '#10B981' }}></span>
                SWARM ONLINE
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Autonomous Multi-Agent Growth Engine for High-Scale E-Commerce
            </p>
          </div>
        </div>

        {/* Center: Autonomy Controller Switch */}
        <div style={{ 
          background: 'rgba(5, 9, 18, 0.8)', 
          border: '1px solid var(--border-subtle)', 
          padding: '4px 6px', 
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, padding: '0 8px' }}>
            Autonomy Mode:
          </span>

          {/* Level 1 */}
          <button
            onClick={() => handleLevelChange(1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: autonomyLevel === 1 ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid transparent',
              background: autonomyLevel === 1 ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
              color: autonomyLevel === 1 ? '#FBBF24' : 'var(--text-muted)',
              transition: 'all 0.2s'
            }}
            title="Every agent action requires merchant one-click approval"
          >
            <ShieldCheck size={14} />
            L1: Copilot
            {pendingCount > 0 && (
              <span style={{ 
                background: '#EF4444', 
                color: '#fff', 
                borderRadius: '9999px', 
                fontSize: '0.65rem', 
                padding: '1px 5px',
                fontWeight: 700
              }}>
                {pendingCount}
              </span>
            )}
          </button>

          {/* Level 2 */}
          <button
            onClick={() => handleLevelChange(2)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: autonomyLevel === 2 ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid transparent',
              background: autonomyLevel === 2 ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
              color: autonomyLevel === 2 ? '#38BDF8' : 'var(--text-muted)',
              transition: 'all 0.2s'
            }}
            title="Auto-approves actions under $500 delta with low risk score"
          >
            <Zap size={14} />
            L2: Semi-Auto (Guardrails)
          </button>

          {/* Level 3 */}
          <button
            onClick={() => handleLevelChange(3)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: autonomyLevel === 3 ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid transparent',
              background: autonomyLevel === 3 ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.2) 100%)' : 'transparent',
              color: autonomyLevel === 3 ? '#34D399' : 'var(--text-muted)',
              boxShadow: autonomyLevel === 3 ? '0 0 14px rgba(16, 185, 129, 0.25)' : 'none',
              transition: 'all 0.2s'
            }}
            title="Fully autonomous continuous optimization loop"
          >
            <Radio size={14} />
            L3: 100% Autopilot
          </button>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Chaos Simulator Trigger Button */}
          <button 
            className="btn btn-chaos"
            onClick={() => {
              soundFx.playAlert();
              onOpenScenarios();
            }}
            style={{ fontSize: '0.82rem', padding: '8px 14px' }}
          >
            <Flame size={16} />
            Simulate Chaos & Growth
          </button>

          {/* AI Commander Chat */}
          <button 
            className="btn btn-indigo"
            onClick={() => {
              soundFx.playClick();
              onOpenChat();
            }}
            style={{ fontSize: '0.82rem', padding: '8px 14px' }}
          >
            <MessageSquareCode size={16} />
            Growth Commander AI
          </button>

          {/* Export Growth Report */}
          <button 
            className="btn btn-secondary"
            onClick={() => {
              soundFx.playClick();
              onOpenReport();
            }}
            title="Export Growth & Autonomous Operations Audit Report"
            style={{ padding: '8px 12px' }}
          >
            <DownloadCloud size={16} />
          </button>

          {/* Sound Toggle */}
          <button 
            className="btn btn-secondary"
            onClick={() => {
              onToggleSound();
              if (!soundEnabled) soundFx.playSuccess();
            }}
            title={soundEnabled ? 'Mute Sound Effects' : 'Unmute Sound Effects'}
            style={{ padding: '8px 12px' }}
          >
            {soundEnabled ? <Volume2 size={16} color="#10B981" /> : <VolumeX size={16} color="#94A3B8" />}
          </button>

        </div>

      </div>
    </header>
  );
};
