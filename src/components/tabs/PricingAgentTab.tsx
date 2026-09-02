import React, { useState } from 'react';
import { 
  Tag, 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  Sliders, 
  Sparkles, 
  RefreshCw, 
  Check, 
  AlertCircle,
  ArrowRight,
  Lock
} from 'lucide-react';
import { Product } from '../../types';
import { soundFx } from '../../services/soundEffects';

interface PricingAgentTabProps {
  products: Product[];
  onUpdateProductPrice: (productId: string, newPrice: number) => void;
  pricingGains: number;
}

export const PricingAgentTab: React.FC<PricingAgentTabProps> = ({
  products,
  onUpdateProductPrice,
  pricingGains
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [simulatedPrice, setSimulatedPrice] = useState<number>(products[0].currentPrice);
  const [minMarginGuardrail, setMinMarginGuardrail] = useState<number>(55);
  const [maxPriceDeltaPct, setMaxPriceDeltaPct] = useState<number>(15);

  const handleSelectProduct = (prod: Product) => {
    setSelectedProduct(prod);
    setSimulatedPrice(prod.currentPrice);
    soundFx.playClick();
  };

  // Calculate elasticity projection
  const priceDiffPct = ((simulatedPrice - selectedProduct.currentPrice) / selectedProduct.currentPrice);
  const demandChangePct = priceDiffPct * selectedProduct.elasticity;
  const projectedDailyUnits = Math.max(1, Math.round(selectedProduct.salesVelocity * (1 + demandChangePct)));
  const simulatedMargin = Math.round(((simulatedPrice - selectedProduct.cogs) / simulatedPrice) * 1000) / 10;
  const projectedDailyGrossProfit = Math.round(projectedDailyUnits * (simulatedPrice - selectedProduct.cogs));
  const currentDailyGrossProfit = Math.round(selectedProduct.salesVelocity * (selectedProduct.currentPrice - selectedProduct.cogs));
  const profitDelta = projectedDailyGrossProfit - currentDailyGrossProfit;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Top Banner: Pricing Agent Header & Summary Stats */}
      <div className="glass-panel" style={{ padding: '20px 24px', borderLeft: '4px solid #06B6D4' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Tag size={24} color="#06B6D4" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  Dynamic Pricing & Competitor Intelligence Agent
                </h2>
                <span className="badge badge-cyan">
                  24/7 Live Scraping Active
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Continuously tracks competitor ASINs, calculates price elasticity curves, and executes stockout arbitrage.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                Total Margin Gains
              </div>
              <div className="mono" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#38BDF8' }}>
                +${pricingGains.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Catalog Scraper Table + Live Elasticity Sandbox */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
        
        {/* Left Column: Live Monitored SKUs */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
              Monitored SKU Catalog & Competitor Intel
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              Select SKU to inspect
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {products.map((prod: Product) => {
              const isSelected = selectedProduct.id === prod.id;
              const hasStockoutRival = prod.competitorPrices.some(c => !c.inStock);

              return (
                <div
                  key={prod.id}
                  onClick={() => handleSelectProduct(prod)}
                  style={{
                    background: isSelected ? 'rgba(6, 182, 212, 0.12)' : 'rgba(15, 23, 42, 0.6)',
                    border: isSelected ? '1px solid rgba(6, 182, 212, 0.45)' : '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border-subtle)' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {prod.name}
                        </span>
                        {hasStockoutRival && (
                          <span className="badge badge-amber" style={{ fontSize: '0.62rem' }}>
                            Arbitrage
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        <span className="mono">SKU: {prod.sku}</span>
                        <span>•</span>
                        <span>COGS: ${prod.cogs.toFixed(2)}</span>
                        <span>•</span>
                        <span style={{ color: '#34D399', fontWeight: 700 }}>Margin: {prod.margin}%</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div className="mono" style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF' }}>
                      ${prod.currentPrice.toFixed(2)}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: prod.status === 'optimal' ? '#34D399' : '#FBBF24' }}>
                      {prod.salesVelocity} units/day
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Elasticity & Competitor Comparison Sandbox */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Active SKU Deep Dive */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>
                  Elasticity Sandbox
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                  {selectedProduct.name}
                </h3>
                <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  Elasticity Coefficient: {selectedProduct.elasticity} (Inelastic)
                </span>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  Current Price
                </span>
                <div className="mono" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF' }}>
                  ${selectedProduct.currentPrice.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Competitor Scraper Snapshot */}
            <div style={{ background: 'rgba(5, 9, 18, 0.75)', borderRadius: '10px', padding: '12px 14px', marginBottom: '18px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Live Competitor ASIN Scraper
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedProduct.competitorPrices.map((comp, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--text-main)' }}>{comp.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="mono" style={{ fontWeight: 700 }}>${comp.price.toFixed(2)}</span>
                      <span className={`badge ${comp.inStock ? 'badge-emerald' : 'badge-rose'}`} style={{ fontSize: '0.65rem' }}>
                        {comp.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Price Slider */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sliders size={14} color="#06B6D4" />
                  Simulate Dynamic Price:
                </label>
                <span className="mono" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#38BDF8' }}>
                  ${simulatedPrice.toFixed(2)}
                </span>
              </div>

              <input
                type="range"
                min={Math.round(selectedProduct.cogs * 1.2)}
                max={Math.round(selectedProduct.originalPrice * 1.3)}
                step="1"
                value={simulatedPrice}
                onChange={(e) => setSimulatedPrice(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#06B6D4', cursor: 'pointer' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                <span>Min: ${(selectedProduct.cogs * 1.2).toFixed(0)} (Break-even)</span>
                <span>Max: ${(selectedProduct.originalPrice * 1.3).toFixed(0)}</span>
              </div>
            </div>

            {/* Predicted Outcome Metrics */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '10px', 
              background: 'rgba(6, 182, 212, 0.08)', 
              border: '1px solid rgba(6, 182, 212, 0.25)', 
              borderRadius: '10px', 
              padding: '12px',
              marginBottom: '16px'
            }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>New Margin</div>
                <div className="mono" style={{ fontSize: '1rem', fontWeight: 800, color: simulatedMargin >= minMarginGuardrail ? '#34D399' : '#EF4444' }}>
                  {simulatedMargin}%
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Est. Daily Sales</div>
                <div className="mono" style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {projectedDailyUnits} units
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Profit Impact</div>
                <div className="mono" style={{ fontSize: '1rem', fontWeight: 800, color: profitDelta >= 0 ? '#34D399' : '#EF4444' }}>
                  {profitDelta >= 0 ? `+$${profitDelta}/day` : `-$${Math.abs(profitDelta)}/day`}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  soundFx.playSuccess();
                  onUpdateProductPrice(selectedProduct.id, simulatedPrice);
                }}
                className="btn btn-primary"
                style={{ flex: 1, background: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)' }}
              >
                <Check size={16} />
                Deploy Optimized Price (${simulatedPrice.toFixed(2)})
              </button>

              <button
                onClick={() => {
                  setSimulatedPrice(selectedProduct.currentPrice);
                  soundFx.playClick();
                }}
                className="btn btn-secondary"
                style={{ padding: '8px 12px' }}
                title="Reset to current price"
              >
                <RefreshCw size={16} />
              </button>
            </div>

          </div>

          {/* Autonomous Safety Guardrails Card */}
          <div className="glass-panel" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Lock size={16} color="#F59E0B" />
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700 }}>
                Autonomous Pricing Guardrails (Safety Bounds)
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.78rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Minimum Gross Margin Floor:</span>
                <span className="mono" style={{ color: '#FBBF24', fontWeight: 700 }}>{minMarginGuardrail}%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Max Single-Day Price Volatility:</span>
                <span className="mono" style={{ color: '#38BDF8', fontWeight: 700 }}>±{maxPriceDeltaPct}%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Stockout Arbitrage Rule:</span>
                <span style={{ color: '#34D399', fontWeight: 700 }}>Auto +8% when competitors OOS</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
