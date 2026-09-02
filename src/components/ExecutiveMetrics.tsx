import React from 'react';
import { 
  TrendingUp, 
  Target, 
  ShoppingCart, 
  Percent, 
  Activity, 
  Clock, 
  ArrowUpRight, 
  DollarSign 
} from 'lucide-react';
import { StoreMetrics } from '../types';

interface ExecutiveMetricsProps {
  metrics: StoreMetrics;
}

export const ExecutiveMetrics: React.FC<ExecutiveMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid-metrics">
      
      {/* Metric 1: Total Revenue & Agent Uplift */}
      <div className="glass-panel" style={{ padding: '18px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Total 30D Revenue
          </span>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DollarSign size={18} color="#10B981" />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <span className="mono" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF' }}>
            ${metrics.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '0.78rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', color: '#34D399', fontWeight: 700, background: 'rgba(16, 185, 129, 0.12)', padding: '2px 6px', borderRadius: '4px' }}>
            <ArrowUpRight size={14} />
            +{metrics.revenueUpliftPercentage}%
          </span>
          <span style={{ color: 'var(--text-dim)' }}>
            agent-driven growth
          </span>
        </div>
      </div>

      {/* Metric 2: Autonomous ROAS */}
      <div className="glass-panel" style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Blended ROAS
          </span>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Target size={18} color="#6366F1" />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <span className="mono" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF' }}>
            {metrics.blendedRoas.toFixed(2)}x
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '0.78rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', color: '#818CF8', fontWeight: 700, background: 'rgba(99, 102, 241, 0.12)', padding: '2px 6px', borderRadius: '4px' }}>
            <TrendingUp size={14} />
            Target: 3.20x
          </span>
          <span style={{ color: 'var(--text-dim)' }}>
            +44% ad efficiency
          </span>
        </div>
      </div>

      {/* Metric 3: Cart Recovery Rate */}
      <div className="glass-panel" style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Cart Recovery Rate
          </span>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(236, 72, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingCart size={18} color="#EC4899" />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <span className="mono" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF' }}>
            {metrics.cartRecoveryRate.toFixed(1)}%
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '0.78rem' }}>
          <span style={{ color: '#F472B6', fontWeight: 700, background: 'rgba(236, 72, 153, 0.12)', padding: '2px 6px', borderRadius: '4px' }}>
            +${metrics.recoveredRevenue.toLocaleString()}
          </span>
          <span style={{ color: 'var(--text-dim)' }}>
            recovered sales
          </span>
        </div>
      </div>

      {/* Metric 4: Gross Margin */}
      <div className="glass-panel" style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Gross Profit Margin
          </span>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Percent size={18} color="#06B6D4" />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <span className="mono" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF' }}>
            {metrics.grossMargin.toFixed(1)}%
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '0.78rem' }}>
          <span style={{ color: '#38BDF8', fontWeight: 700, background: 'rgba(6, 182, 212, 0.12)', padding: '2px 6px', borderRadius: '4px' }}>
            +4.2% margin gain
          </span>
          <span style={{ color: 'var(--text-dim)' }}>
            via elasticity AI
          </span>
        </div>
      </div>

      {/* Metric 5: Autonomous Actions */}
      <div className="glass-panel" style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Autonomous Actions
          </span>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={18} color="#F59E0B" />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <span className="mono" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF' }}>
            {metrics.totalAgentActions.toLocaleString()}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '0.78rem' }}>
          <span style={{ color: '#FBBF24', fontWeight: 700, background: 'rgba(245, 158, 11, 0.12)', padding: '2px 6px', borderRadius: '4px' }}>
            24/7 Real-Time
          </span>
          <span style={{ color: 'var(--text-dim)' }}>
            0 human latency
          </span>
        </div>
      </div>

      {/* Metric 6: Hours Saved */}
      <div className="glass-panel" style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Merchant Hours Saved
          </span>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={18} color="#10B981" />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <span className="mono" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF' }}>
            {metrics.hoursSavedToday} hrs
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '0.78rem' }}>
          <span style={{ color: '#34D399', fontWeight: 700, background: 'rgba(16, 185, 129, 0.12)', padding: '2px 6px', borderRadius: '4px' }}>
            = 2.3 FTEs
          </span>
          <span style={{ color: 'var(--text-dim)' }}>
            ops automated
          </span>
        </div>
      </div>

    </div>
  );
};
