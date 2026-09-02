import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  X, 
  RotateCcw, 
  AlertCircle, 
  Clock, 
  Sparkles, 
  Filter, 
  Sliders,
  DollarSign
} from 'lucide-react';
import { ActionProposal } from '../../types';
import { soundFx } from '../../services/soundEffects';

interface ApprovalQueueTabProps {
  proposals: ActionProposal[];
  onExecuteProposal: (id: string) => void;
  onRejectProposal: (id: string) => void;
  onRollbackProposal: (id: string) => void;
}

export const ApprovalQueueTab: React.FC<ApprovalQueueTabProps> = ({
  proposals,
  onExecuteProposal,
  onRejectProposal,
  onRollbackProposal
}) => {
  const [filter, setFilter] = useState<'all' | 'pending_review' | 'auto_approved' | 'approved' | 'rolled_back'>('all');

  const filteredProposals = filter === 'all' 
    ? proposals 
    : proposals.filter(p => p.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_review': return <span className="badge badge-amber">Pending Merchant Approval</span>;
      case 'auto_approved': return <span className="badge badge-emerald">Auto-Approved by Guardrails</span>;
      case 'approved': return <span className="badge badge-emerald">Merchant Approved</span>;
      case 'rejected': return <span className="badge badge-rose">Dismissed</span>;
      case 'rolled_back': return <span className="badge badge-cyan">Rolled Back</span>;
      default: return <span className="badge badge-secondary">{status}</span>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'Low': return <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>Risk: Low</span>;
      case 'Medium': return <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>Risk: Medium</span>;
      case 'High': return <span className="badge badge-rose" style={{ fontSize: '0.65rem' }}>Risk: High</span>;
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Top Banner: Approval Queue Header */}
      <div className="glass-panel" style={{ padding: '20px 24px', borderLeft: '4px solid #10B981' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={24} color="#10B981" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  Human-in-the-Loop Action Approval & Audit Ledger
                </h2>
                <span className="badge badge-emerald">
                  Immutable Audit Trail
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Review high-impact actions before execution, configure safety constraints, or rollback previous changes with zero friction.
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setFilter('all'); soundFx.playClick(); }}
              className={`badge ${filter === 'all' ? 'badge-emerald' : 'badge-secondary'}`}
              style={{ cursor: 'pointer', padding: '6px 12px', fontSize: '0.75rem', border: 'none' }}
            >
              All ({proposals.length})
            </button>
            <button
              onClick={() => { setFilter('pending_review'); soundFx.playClick(); }}
              className={`badge ${filter === 'pending_review' ? 'badge-amber' : 'badge-secondary'}`}
              style={{ cursor: 'pointer', padding: '6px 12px', fontSize: '0.75rem', border: 'none' }}
            >
              Pending ({proposals.filter(p => p.status === 'pending_review').length})
            </button>
            <button
              onClick={() => { setFilter('auto_approved'); soundFx.playClick(); }}
              className={`badge ${filter === 'auto_approved' ? 'badge-emerald' : 'badge-secondary'}`}
              style={{ cursor: 'pointer', padding: '6px 12px', fontSize: '0.75rem', border: 'none' }}
            >
              Auto-Approved ({proposals.filter(p => p.status === 'auto_approved').length})
            </button>
            <button
              onClick={() => { setFilter('rolled_back'); soundFx.playClick(); }}
              className={`badge ${filter === 'rolled_back' ? 'badge-cyan' : 'badge-secondary'}`}
              style={{ cursor: 'pointer', padding: '6px 12px', fontSize: '0.75rem', border: 'none' }}
            >
              Rolled Back ({proposals.filter(p => p.status === 'rolled_back').length})
            </button>
          </div>
        </div>
      </div>

      {/* Proposals List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredProposals.map((prop: ActionProposal) => {
          const isPending = prop.status === 'pending_review';
          const isExecuted = prop.status === 'approved' || prop.status === 'auto_approved';

          return (
            <div 
              key={prop.id}
              className="glass-panel"
              style={{
                padding: '20px 22px',
                border: isPending ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-subtle)',
                borderRadius: '14px',
                background: isPending ? 'rgba(15, 23, 42, 0.8)' : 'rgba(8, 14, 28, 0.6)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    {getStatusBadge(prop.status)}
                    <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>
                      {prop.agentName}
                    </span>
                    <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                      {prop.confidence}% Confidence
                    </span>
                    {getRiskBadge(prop.impact.riskScore)}
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                      {prop.createdAt}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
                    {prop.title}
                  </h3>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45, maxWidth: '850px' }}>
                    {prop.description}
                  </p>
                </div>

                {/* Impact Preview Box */}
                <div style={{ 
                  background: 'rgba(5, 9, 18, 0.85)', 
                  border: '1px solid var(--border-subtle)', 
                  borderRadius: '10px', 
                  padding: '10px 16px',
                  textAlign: 'right',
                  minWidth: '150px'
                }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Forecast Impact
                  </div>
                  <div className="mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34D399' }}>
                    {prop.impact.value}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#60A5FA' }}>
                    {prop.impact.metric}
                  </div>
                </div>
              </div>

              {/* Reasoning Box */}
              <div style={{ 
                background: 'rgba(16, 185, 129, 0.05)', 
                borderLeft: '3px solid #10B981', 
                padding: '10px 14px', 
                borderRadius: '0 8px 8px 0',
                fontSize: '0.78rem',
                color: 'var(--text-main)',
                marginBottom: '16px',
                lineHeight: 1.4
              }}>
                <strong style={{ color: '#34D399' }}>Agent Reasoning:</strong> {prop.reasoning}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                {isPending && (
                  <>
                    <button
                      onClick={() => onRejectProposal(prop.id)}
                      className="btn btn-secondary"
                      style={{ fontSize: '0.78rem', padding: '7px 14px' }}
                    >
                      <X size={14} />
                      Dismiss
                    </button>

                    <button
                      onClick={() => onExecuteProposal(prop.id)}
                      className="btn btn-primary"
                      style={{ fontSize: '0.78rem', padding: '7px 18px' }}
                    >
                      <Check size={14} />
                      Approve & Execute Action
                    </button>
                  </>
                )}

                {isExecuted && prop.canRollback && (
                  <button
                    onClick={() => onRollbackProposal(prop.id)}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                    title="Rollback state parameters to previous baseline"
                  >
                    <RotateCcw size={14} />
                    Rollback Changes
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
