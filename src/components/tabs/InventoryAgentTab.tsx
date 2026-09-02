import React, { useState } from 'react';
import { 
  Boxes, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Truck, 
  Layers, 
  TrendingUp, 
  Sparkles,
  Check
} from 'lucide-react';
import { Product } from '../../types';
import { soundFx } from '../../services/soundEffects';

interface InventoryAgentTabProps {
  products: Product[];
  onRestockProduct: (productId: string, qty: number) => void;
  inventoryHealth: number;
}

export const InventoryAgentTab: React.FC<InventoryAgentTabProps> = ({
  products,
  onRestockProduct,
  inventoryHealth
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[1]);
  const [restockQty, setRestockQty] = useState<number>(150);
  const [poDrafted, setPoDrafted] = useState<boolean>(false);

  const handleSelectProduct = (prod: Product) => {
    setSelectedProduct(prod);
    setPoDrafted(false);
    soundFx.playClick();
  };

  const daysRemaining = Math.round((selectedProduct.inventory / selectedProduct.salesVelocity) * 10) / 10;
  const isStockoutThreat = daysRemaining <= 7;

  const handleExecuteRestock = () => {
    soundFx.playSuccess();
    onRestockProduct(selectedProduct.id, restockQty);
    setPoDrafted(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Top Banner: Inventory Agent Header */}
      <div className="glass-panel" style={{ padding: '20px 24px', borderLeft: '4px solid #F59E0B' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Boxes size={24} color="#F59E0B" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  Predictive Inventory & Surge Forecaster Agent
                </h2>
                <span className="badge badge-amber">
                  Supply Chain Watchdog Active
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Correlates marketing ad spend with SKU depletion velocities, forecasts stockouts, and auto-drafts replenishment POs.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                Inventory Health Index
              </div>
              <div className="mono" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FBBF24' }}>
                {inventoryHealth}% Optimal
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: SKU Inventory Health Table + PO Generator */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
        
        {/* Left: Inventory Velocity & Depletion Matrix */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
              SKU Stock Velocity & Run-Rate Matrix
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              8 SKUs tracked
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {products.map((prod: Product) => {
              const isSelected = selectedProduct.id === prod.id;
              const days = Math.round((prod.inventory / prod.salesVelocity) * 10) / 10;
              const isCritical = days <= 7;
              const isSurplus = days >= 45;

              return (
                <div
                  key={prod.id}
                  onClick={() => handleSelectProduct(prod)}
                  style={{
                    background: isSelected ? 'rgba(245, 158, 11, 0.12)' : 'rgba(15, 23, 42, 0.65)',
                    border: isCritical 
                      ? '1px solid rgba(239, 68, 68, 0.45)' 
                      : isSelected 
                      ? '1px solid rgba(245, 158, 11, 0.45)' 
                      : '1px solid var(--border-subtle)',
                    borderRadius: '12px',
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
                      style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {prod.name}
                        </span>
                        {isCritical && <span className="badge badge-rose" style={{ fontSize: '0.6rem' }}>Stockout Alert</span>}
                        {isSurplus && <span className="badge badge-cyan" style={{ fontSize: '0.6rem' }}>Surplus</span>}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        <span>Velocity: {prod.salesVelocity}/day</span>
                        <span>•</span>
                        <span>Stock: <strong className="mono" style={{ color: '#fff' }}>{prod.inventory} units</strong></span>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div className="mono" style={{ 
                      fontSize: '1rem', 
                      fontWeight: 800, 
                      color: isCritical ? '#EF4444' : isSurplus ? '#38BDF8' : '#34D399' 
                    }}>
                      {days} Days Left
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                      Reorder at: {prod.restockLevel} units
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Automated Purchase Order Draft & Liquidation Suggester */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} color="#F59E0B" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                  Automated Purchase Order (PO) Engine
                </h3>
              </div>
              <span className="badge badge-amber">
                PO #PO-2026-089
              </span>
            </div>

            <div style={{ background: 'rgba(5, 9, 18, 0.8)', borderRadius: '10px', padding: '14px', marginBottom: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Target SKU:</span>
                <span style={{ fontWeight: 700, color: '#fff' }}>{selectedProduct.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Current Warehouse Stock:</span>
                <span className="mono" style={{ fontWeight: 700, color: isStockoutThreat ? '#EF4444' : '#34D399' }}>
                  {selectedProduct.inventory} units ({daysRemaining} days of stock)
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Supplier Lead Time:</span>
                <span style={{ color: '#FBBF24', fontWeight: 700 }}>8-10 business days</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Unit Cost (COGS):</span>
                <span className="mono" style={{ color: '#fff' }}>${selectedProduct.cogs.toFixed(2)}</span>
              </div>
            </div>

            {/* Replenishment Quantity Slider */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Replenishment Quantity:</span>
                <span className="mono" style={{ color: '#FBBF24', fontWeight: 700 }}>{restockQty} units (Total: ${(restockQty * selectedProduct.cogs).toLocaleString()})</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="25"
                value={restockQty}
                onChange={(e) => setRestockQty(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#F59E0B', cursor: 'pointer' }}
              />
            </div>

            {/* Action Trigger */}
            {!poDrafted ? (
              <button
                onClick={handleExecuteRestock}
                className="btn btn-primary"
                style={{ width: '100%', background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', color: '#1A1306', fontWeight: 700, padding: '10px' }}
              >
                <Truck size={16} />
                Auto-Draft & Transmit Supplier PO ({restockQty} units)
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
                ✅ Supplier PO Transmitted & Warehouse Slot Reserved!
              </div>
            )}
          </div>

          {/* Autonomous Inventory Balancer */}
          <div className="glass-panel" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Layers size={16} color="#06B6D4" />
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700 }}>
                Inventory-Aware Marketing Traffic Routing
              </h4>
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              When a SKU reaches less than 5 days of inventory, the swarm autonomously throttles top-of-funnel ad spend and redirects paid traffic to high-margin surplus catalog items.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
