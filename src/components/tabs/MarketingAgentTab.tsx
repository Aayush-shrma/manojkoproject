import React, { useState } from 'react';
import { 
  Megaphone, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles, 
  Play, 
  Pause, 
  DollarSign, 
  Zap, 
  Copy, 
  Check,
  Flame
} from 'lucide-react';
import { AdCampaign } from '../../types';
import { soundFx } from '../../services/soundEffects';

interface MarketingAgentTabProps {
  campaigns: AdCampaign[];
  onToggleCampaign: (id: string) => void;
  onScaleCampaign: (id: string, deltaAmount: number) => void;
  adEfficiencyGains: number;
}

export const MarketingAgentTab: React.FC<MarketingAgentTabProps> = ({
  campaigns,
  onToggleCampaign,
  onScaleCampaign,
  adEfficiencyGains
}) => {
  const [selectedCampaign, setSelectedCampaign] = useState<AdCampaign>(campaigns[0]);
  const [copiedHook, setCopiedHook] = useState<string | null>(null);

  const aiGeneratedHooks = [
    {
      angle: '🔥 Problem-Solution POV (TikTok / Reels)',
      hook: 'POV: You turn on AeroPulse ANC and the entire noisy NYC subway goes dead silent.',
      body: '40-hour battery, custom acoustic drivers, and military-grade noise cancellation. Get 15% off today only.'
    },
    {
      angle: '⚡ Aesthetic Setup Desk Tour (Instagram / Pinterest)',
      hook: 'The one ambient light setup that actually fixes your late-night eye strain.',
      body: 'Syncs with your Mac, Spotify, and circadian lighting schedule. Over 8,000+ developer setups upgraded.'
    },
    {
      angle: '🎯 Direct Competitor Comparison (Google Search / P-Max)',
      hook: 'Why 12,000+ athletes ditched bulky stainless steel bottles for MagPulse 2.0.',
      body: 'Snaps directly to gym equipment for workout filming. 24-hr ice cold insulation guaranteed.'
    }
  ];

  const handleCopyHook = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHook(text);
    soundFx.playSuccess();
    setTimeout(() => setCopiedHook(null), 2000);
  };

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'tiktok': return <span className="badge badge-pink">TikTok Ads</span>;
      case 'meta': return <span className="badge badge-indigo">Meta Advantage+</span>;
      case 'google': return <span className="badge badge-cyan">Google P-Max</span>;
      default: return <span className="badge badge-emerald">{platform}</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Top Banner: Marketing Agent Header */}
      <div className="glass-panel" style={{ padding: '20px 24px', borderLeft: '4px solid #6366F1' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Megaphone size={24} color="#6366F1" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  Autonomous Ad & Growth Marketing Agent
                </h2>
                <span className="badge badge-indigo">
                  Cross-Platform Bid Manager Active
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Automates real-time bid pacing across Meta, Google & TikTok, detects creative fatigue, and crafts high-converting copy.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                Ad Efficiency Gains
              </div>
              <div className="mono" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#818CF8' }}>
                +${adEfficiencyGains.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Campaign Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
        
        {/* Left: Active Ad Sets & Pacing Table */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
              Live Ad Campaigns & Real-Time ROAS
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              {campaigns.length} campaigns active
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {campaigns.map((camp: AdCampaign) => {
              const isSelected = selectedCampaign.id === camp.id;
              const isFatigued = camp.status === 'fatigued';
              const isScaled = camp.status === 'scaled';

              return (
                <div
                  key={camp.id}
                  onClick={() => {
                    setSelectedCampaign(camp);
                    soundFx.playClick();
                  }}
                  style={{
                    background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'rgba(15, 23, 42, 0.65)',
                    border: isFatigued 
                      ? '1px solid rgba(239, 68, 68, 0.45)' 
                      : isSelected 
                      ? '1px solid rgba(99, 102, 241, 0.45)' 
                      : '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        {getPlatformBadge(camp.platform)}
                        {isFatigued && <span className="badge badge-rose">Creative Decayed</span>}
                        {isScaled && <span className="badge badge-emerald">🚀 Scaled by Agent</span>}
                      </div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {camp.name}
                      </h4>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span className="mono" style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 800, 
                        color: camp.roas >= camp.targetRoas ? '#34D399' : '#EF4444' 
                      }}>
                        {camp.roas.toFixed(2)}x
                      </span>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                        Target: {camp.targetRoas.toFixed(1)}x
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.78rem', color: isFatigued ? '#FCA5A5' : 'var(--text-muted)', marginBottom: '10px', lineHeight: 1.4 }}>
                    {camp.aiRecommendation}
                  </p>

                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    paddingTop: '8px', 
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: '0.75rem' 
                  }}>
                    <div style={{ display: 'flex', gap: '12px', color: 'var(--text-muted)' }}>
                      <span>Budget: <strong className="mono" style={{ color: '#fff' }}>${camp.dailyBudget}/d</strong></span>
                      <span>CTR: <strong className="mono" style={{ color: '#fff' }}>{camp.ctr}%</strong></span>
                      <span>CPA: <strong className="mono" style={{ color: '#fff' }}>${camp.cpa}</strong></span>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          soundFx.playSuccess();
                          onScaleCampaign(camp.id, 200);
                        }}
                        className="btn btn-secondary"
                        style={{ padding: '3px 8px', fontSize: '0.7rem' }}
                        title="Scale Budget +$200/day"
                      >
                        +$200/d
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          soundFx.playClick();
                          onToggleCampaign(camp.id);
                        }}
                        className={camp.status === 'paused' ? 'btn btn-primary' : 'btn btn-outline-danger'}
                        style={{ padding: '3px 8px', fontSize: '0.7rem' }}
                      >
                        {camp.status === 'paused' ? <Play size={12} /> : <Pause size={12} />}
                        {camp.status === 'paused' ? 'Resume' : 'Pause'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: AI Ad Copy & Video Hook Generator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="#6366F1" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                  Agentic Ad Angle & Creative Generator
                </h3>
              </div>
              <span className="badge badge-indigo">
                High-Converting Angles
              </span>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Autonomous prompt engine tailored to current buyer demographics and viral hooks:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {aiGeneratedHooks.map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(5, 9, 18, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    borderRadius: '10px',
                    padding: '12px 14px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#A5B4FC' }}>
                      {item.angle}
                    </span>
                    <button
                      onClick={() => handleCopyHook(item.hook + '\n\n' + item.body)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: copiedHook?.includes(item.hook) ? '#10B981' : 'var(--text-dim)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.72rem'
                      }}
                    >
                      {copiedHook?.includes(item.hook) ? <Check size={12} /> : <Copy size={12} />}
                      {copiedHook?.includes(item.hook) ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>
                    "{item.hook}"
                  </div>

                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {item.body}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Autonomous Budget Allocation Heatmap summary */}
          <div className="glass-panel" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Zap size={16} color="#10B981" />
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700 }}>
                Dynamic ROAS Pacing Protocol
              </h4>
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Agent checks ROAS every 15 minutes. Automatically scales top 10% performing creatives by +20% daily while auto-pausing any creative with CPA exceeding 1.35x target threshold.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
