import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  Zap, 
  Check, 
  MessageSquareCode, 
  Mic, 
  Radio
} from 'lucide-react';
import { ActionProposal } from '../types';
import { AgentOrchestrator, SwarmState } from '../services/agentEngine';
import { soundFx } from '../services/soundEffects';

interface GrowthChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: SwarmState;
  onExecuteProposal: (id: string) => void;
  onAddProposal: (proposal: ActionProposal) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  proposal?: ActionProposal;
  timestamp: string;
}

export const GrowthChatModal: React.FC<GrowthChatModalProps> = ({
  isOpen,
  onClose,
  state,
  onExecuteProposal,
  onAddProposal
}) => {
  const [query, setQuery] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      text: 'Hello merchant! I am **Growth Commander AI**. I continuously coordinate your Dynamic Pricing, Autonomous Ads, Cart Recovery, and Inventory agents. \n\nHow can I help scale your store or protect your margins today?',
      timestamp: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'Liquidate slow-moving cushion inventory before Friday',
    'Scale winning TikTok UGC ads with ROAS > 3.5x',
    'Raise prices by 6% on inelastic catalog items',
    'Recover high-value abandoned carts with WhatsApp concierge'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || query;
    if (!text.trim()) return;

    soundFx.playClick();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsTyping(true);

    setTimeout(() => {
      soundFx.playAgentPulse();
      const response = AgentOrchestrator.processNaturalLanguageCommand(state, text);

      if (response.suggestedProposal) {
        onAddProposal(response.suggestedProposal);
      }

      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: response.replyText,
        proposal: response.suggestedProposal,
        timestamp: 'Just now'
      };

      setMessages(prev => [...prev, agentMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ width: '740px', maxWidth: '95vw', height: '620px', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <div style={{ 
          padding: '16px 20px', 
          borderBottom: '1px solid var(--border-subtle)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          background: 'rgba(5, 9, 18, 0.95)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #10B981 0%, #6366F1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Growth Commander AI</h3>
                <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                  <span className="pulse-dot" style={{ background: '#10B981' }}></span> Live Orchestrator
                </span>
              </div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Command the entire 5-agent swarm using natural language directives
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Stream */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {messages.map((msg) => (
            <div 
              key={msg.id}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{
                background: msg.sender === 'user' 
                  ? 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)' 
                  : 'rgba(15, 23, 42, 0.9)',
                border: msg.sender === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                padding: '12px 16px',
                fontSize: '0.84rem',
                lineHeight: 1.45,
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)'
              }}>
                <div style={{ whiteSpace: 'pre-line' }}>
                  {msg.text}
                </div>
              </div>

              {/* Embedded Action Proposal Card if generated by Agent */}
              {msg.proposal && (
                <div style={{
                  background: 'rgba(5, 9, 18, 0.95)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  borderRadius: '12px',
                  padding: '14px',
                  marginTop: '4px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                      Directive Formulated
                    </span>
                    <span className="mono" style={{ fontSize: '0.85rem', fontWeight: 800, color: '#34D399' }}>
                      {msg.proposal.impact.value}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                    {msg.proposal.title}
                  </h4>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    {msg.proposal.description}
                  </p>

                  <button
                    onClick={() => {
                      if (msg.proposal) onExecuteProposal(msg.proposal.id);
                    }}
                    className="btn btn-primary"
                    style={{ width: '100%', fontSize: '0.78rem', padding: '7px' }}
                  >
                    <Check size={14} />
                    Approve & Execute Swarm Action
                  </button>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div style={{ alignSelf: 'flex-start', background: 'rgba(15, 23, 42, 0.8)', padding: '10px 14px', borderRadius: '12px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <span className="pulse-dot" style={{ background: '#10B981', marginRight: '8px' }}></span>
              Growth Commander is querying swarm agents...
            </div>
          )}
        </div>

        {/* Quick Prompts Chips */}
        <div style={{ padding: '8px 20px', background: 'rgba(8, 14, 28, 0.8)', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '6px', overflowX: 'auto' }}>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                borderRadius: '8px',
                padding: '4px 10px',
                fontSize: '0.72rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              ⚡ {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div style={{ padding: '14px 20px', background: 'rgba(5, 9, 18, 0.98)', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Instruct the swarm (e.g. 'Optimize ROAS on TikTok ads', 'Liquidate 200 headphones')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            style={{
              flex: 1,
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#FFFFFF',
              fontSize: '0.84rem',
              outline: 'none'
            }}
          />

          <button
            onClick={() => handleSend()}
            className="btn btn-primary"
            style={{ padding: '10px 18px' }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
