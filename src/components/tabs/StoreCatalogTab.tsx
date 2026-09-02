import React from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  DollarSign, 
  Check, 
  Zap, 
  ArrowUpRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product } from '../../types';
import { soundFx } from '../../services/soundEffects';

interface StoreCatalogTabProps {
  products: Product[];
  onSimulateCustomerPurchase: (productId: string) => void;
}

export const StoreCatalogTab: React.FC<StoreCatalogTabProps> = ({
  products,
  onSimulateCustomerPurchase
}) => {
  const handleSimulateBuy = (prod: Product) => {
    soundFx.playSuccess();
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.8 }
    });
    onSimulateCustomerPurchase(prod.id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Top Banner: Store Catalog Header */}
      <div className="glass-panel" style={{ padding: '20px 24px', borderLeft: '4px solid #10B981' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={24} color="#10B981" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  Live Store Catalog & Autonomous Merchandising
                </h2>
                <span className="badge badge-emerald">
                  Shopify / Headless Sync Active
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                View current live storefront prices, dynamic bundles, and inventory counters updated in real-time by the swarm.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
        {products.map((prod: Product) => {
          const discountPct = Math.round(((prod.originalPrice - prod.currentPrice) / prod.originalPrice) * 100);

          return (
            <div 
              key={prod.id} 
              className="glass-panel"
              style={{ 
                borderRadius: '16px', 
                overflow: 'hidden', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s'
              }}
            >
              <div>
                {/* Image Container */}
                <div style={{ position: 'relative', height: '180px', width: '100%', overflow: 'hidden' }}>
                  <img 
                    src={prod.image} 
                    alt={prod.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                  />
                  
                  {/* Category Tag */}
                  <span style={{ 
                    position: 'absolute', 
                    top: '12px', 
                    left: '12px', 
                    background: 'rgba(6, 9, 17, 0.85)', 
                    color: '#fff', 
                    fontSize: '0.68rem', 
                    fontWeight: 700, 
                    padding: '3px 8px', 
                    borderRadius: '6px',
                    backdropFilter: 'blur(6px)'
                  }}>
                    {prod.category}
                  </span>

                  {/* Discount Tag if price reduced */}
                  {discountPct > 0 && (
                    <span style={{ 
                      position: 'absolute', 
                      top: '12px', 
                      right: '12px', 
                      background: '#10B981', 
                      color: '#fff', 
                      fontSize: '0.68rem', 
                      fontWeight: 800, 
                      padding: '3px 8px', 
                      borderRadius: '6px'
                    }}>
                      -{discountPct}% OFF
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '16px' }}>
                  {prod.aiTag && (
                    <div style={{ fontSize: '0.72rem', color: '#38BDF8', fontWeight: 700, marginBottom: '6px' }}>
                      {prod.aiTag}
                    </div>
                  )}

                  <h3 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px', lineHeight: 1.3 }}>
                    {prod.name}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                    <span className="mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                      ${prod.currentPrice.toFixed(2)}
                    </span>
                    {prod.currentPrice !== prod.originalPrice && (
                      <span className="mono" style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                        ${prod.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    fontSize: '0.75rem', 
                    color: 'var(--text-muted)',
                    background: 'rgba(5, 9, 18, 0.6)',
                    padding: '8px 10px',
                    borderRadius: '8px'
                  }}>
                    <span>Stock: <strong className="mono" style={{ color: prod.inventory <= 90 ? '#EF4444' : '#fff' }}>{prod.inventory} units</strong></span>
                    <span>Margin: <strong className="mono" style={{ color: '#34D399' }}>{prod.margin}%</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Button: Simulate Live Purchase */}
              <div style={{ padding: '0 16px 16px 16px' }}>
                <button
                  onClick={() => handleSimulateBuy(prod)}
                  className="btn btn-secondary"
                  style={{ width: '100%', fontSize: '0.78rem', padding: '8px 12px' }}
                >
                  <Zap size={14} color="#10B981" />
                  Simulate Live Customer Order (+${prod.currentPrice.toFixed(2)})
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
