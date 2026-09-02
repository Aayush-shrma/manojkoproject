import React, { useState } from 'react';
import { 
  ShoppingCart, 
  MessageSquare, 
  Send, 
  Sparkles, 
  Check, 
  Clock, 
  DollarSign, 
  Percent, 
  UserCheck, 
  Zap,
  PhoneCall
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AbandonedCart } from '../../types';
import { soundFx } from '../../services/soundEffects';

interface RetentionAgentTabProps {
  carts: AbandonedCart[];
  onRecoverCart: (cartId: string) => void;
  recoveredRevenue: number;
  recoveryRate: number;
}

export const RetentionAgentTab: React.FC<RetentionAgentTabProps> = ({
  carts,
  onRecoverCart,
  recoveredRevenue,
  recoveryRate
}) => {
  const [selectedCart, setSelectedCart] = useState<AbandonedCart>(carts[0]);
  const [customDiscount, setCustomDiscount] = useState<number>(10);

  const handleSelectCart = (cart: AbandonedCart) => {
    setSelectedCart(cart);
    soundFx.playClick();
  };

  const handleSimulateRecovery = (cartId: string) => {
    soundFx.playSuccess();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    onRecoverCart(cartId);
  };

  const getIntentBadge = (intent: string) => {
    switch (intent) {
      case 'high': return <span className="badge badge-emerald">High Intent</span>;
      case 'price_sensitive': return <span className="badge badge-amber">Price Sensitive</span>;
      case 'shipping_sensitive': return <span className="badge badge-cyan">Shipping Friction</span>;
      default: return <span className="badge badge-secondary">{intent}</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Top Banner: Retention Agent Header */}
      <div className="glass-panel" style={{ padding: '20px 24px', borderLeft: '4px solid #EC4899' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingCart size={24} color="#EC4899" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  Smart Retention & Abandoned Cart Recovery Agent
                </h2>
                <span className="badge badge-pink">
                  Agentic WhatsApp Concierge Active
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Understands dropout friction, calculates maximum allowable margin incentives, and engages high-intent shoppers on WhatsApp.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                Total Recovered Sales
              </div>
              <div className="mono" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#F472B6' }}>
                +${recoveredRevenue.toLocaleString()}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                Winback Conversion Rate
              </div>
              <div className="mono" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#34D399' }}>
                {recoveryRate}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Carts Table + Interactive WhatsApp Concierge Simulator */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
        
        {/* Left: Active Abandoned Cart Sessions */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
              Live Abandoned Checkout Sessions
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              {carts.length} carts tracked
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {carts.map((cart: AbandonedCart) => {
              const isSelected = selectedCart.id === cart.id;
              const isRecovered = cart.recoveryStatus === 'recovered';

              return (
                <div
                  key={cart.id}
                  onClick={() => handleSelectCart(cart)}
                  style={{
                    background: isSelected ? 'rgba(236, 72, 153, 0.12)' : 'rgba(15, 23, 42, 0.65)',
                    border: isRecovered 
                      ? '1px solid rgba(16, 185, 129, 0.4)' 
                      : isSelected 
                      ? '1px solid rgba(236, 72, 153, 0.45)' 
                      : '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {cart.customerName}
                        </span>
                        {getIntentBadge(cart.intentScore)}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {cart.email} • {cart.items.length} items
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div className="mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF' }}>
                        ${cart.totalValue.toFixed(2)}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                        {cart.abandonedMinutesAgo}m ago
                      </div>
                    </div>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    paddingTop: '8px', 
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: '0.75rem' 
                  }}>
                    <span style={{ color: 'var(--text-dim)' }}>
                      Channel: <strong style={{ color: '#fff', textTransform: 'uppercase' }}>{cart.recoveryChannel}</strong>
                    </span>

                    {isRecovered ? (
                      <span className="badge badge-emerald">
                        <Check size={12} /> Recovered (+${cart.recoveredValue?.toFixed(2)})
                      </span>
                    ) : (
                      <span className="badge badge-pink">
                        {cart.recoveryStatus === 'whatsapp_sent' ? 'Concierge Dispatched' : 'Agent Ready'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Interactive WhatsApp Conversational Recovery Mock */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', background: 'rgba(10, 16, 30, 0.9)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={18} color="#FFFFFF" />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF' }}>
                    Agentic WhatsApp Concierge
                  </h3>
                  <div style={{ fontSize: '0.72rem', color: '#34D399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span className="pulse-dot" style={{ background: '#34D399' }}></span> Active Session: {selectedCart.customerName}
                  </div>
                </div>
              </div>

              <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                Cart: ${selectedCart.totalValue.toFixed(2)}
              </span>
            </div>

            {/* Simulated WhatsApp Chat Bubble Stream */}
            <div style={{ 
              background: '#0c1322', 
              borderRadius: '12px', 
              padding: '16px', 
              minHeight: '220px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              {/* Agent Bubble 1 */}
              <div style={{ 
                alignSelf: 'flex-start', 
                background: 'rgba(30, 41, 59, 0.85)', 
                padding: '10px 14px', 
                borderRadius: '12px 12px 12px 2px',
                maxWidth: '85%',
                fontSize: '0.82rem',
                lineHeight: 1.4,
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ fontSize: '0.68rem', color: '#34D399', fontWeight: 700, marginBottom: '2px' }}>
                  ShopPilot AI Concierge
                </div>
                Hey {selectedCart.customerName.split(' ')[0]}! 👋 Noticed you left your <strong>{selectedCart.items[0]?.name}</strong> in your cart. 
              </div>

              {/* Agent Bubble 2 (Dynamic Offer) */}
              <div style={{ 
                alignSelf: 'flex-start', 
                background: 'rgba(30, 41, 59, 0.85)', 
                padding: '10px 14px', 
                borderRadius: '12px 12px 12px 2px',
                maxWidth: '85%',
                fontSize: '0.82rem',
                lineHeight: 1.4,
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                {selectedCart.intentScore === 'shipping_sensitive' ? (
                  <>I unlocked <strong>Free Express Priority Delivery ($15 value)</strong> for your order. Tap below to complete with 1-click Apple Pay.</>
                ) : (
                  <>I unlocked an exclusive <strong>{customDiscount}% dynamic VIP savings</strong> for the next 30 minutes! Code: <strong className="mono" style={{ color: '#F472B6' }}>VIP{customDiscount}</strong></>
                )}
                <div style={{ 
                  marginTop: '8px', 
                  background: 'rgba(16, 185, 129, 0.15)', 
                  border: '1px dashed #10B981', 
                  padding: '6px 10px', 
                  borderRadius: '6px',
                  textAlign: 'center',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#34D399'
                }}>
                  👉 [1-Click Pre-Filled Checkout URL]
                </div>
              </div>

              {/* Customer Response if Recovered */}
              {selectedCart.recoveryStatus === 'recovered' && (
                <div style={{ 
                  alignSelf: 'flex-end', 
                  background: '#059669', 
                  color: '#FFFFFF', 
                  padding: '10px 14px', 
                  borderRadius: '12px 12px 2px 12px',
                  maxWidth: '85%',
                  fontSize: '0.82rem',
                  lineHeight: 1.4
                }}>
                  Awesome, just checked out! Thanks for the discount! 🎉
                </div>
              )}
            </div>

            {/* Dynamic Discount Controller Slider */}
            <div style={{ marginTop: '16px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Dynamic Margin Discount Incentive:</span>
                <span className="mono" style={{ color: '#F472B6', fontWeight: 700 }}>{customDiscount}% ($Rank: Optimal LTV)</span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="1"
                value={customDiscount}
                onChange={(e) => setCustomDiscount(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#EC4899', cursor: 'pointer' }}
              />
            </div>

            {/* Action Trigger Button */}
            {selectedCart.recoveryStatus !== 'recovered' ? (
              <button
                onClick={() => handleSimulateRecovery(selectedCart.id)}
                className="btn btn-primary"
                style={{ width: '100%', background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)', padding: '10px' }}
              >
                <Send size={16} />
                Deploy WhatsApp Winback & Recover ${selectedCart.totalValue.toFixed(2)}
              </button>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '10px', 
                background: 'rgba(16, 185, 129, 0.15)', 
                border: '1px solid rgba(16, 185, 129, 0.4)', 
                borderRadius: '8px',
                color: '#34D399',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}>
                ✅ Cart Successfully Recovered via ShopPilot AI Concierge
              </div>
            )}

          </div>

          {/* Retention Insights Card */}
          <div className="glass-panel" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sparkles size={16} color="#EC4899" />
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700 }}>
                Dynamic Incentive Intelligence
              </h4>
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              The agent never offers discounts to users with high purchase intent (saving margin). For price-hesitant users, it calculates the optimal discount that maximizes net order margin while beating churn.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
