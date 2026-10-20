import { useState } from 'react';
import { categories, products } from '../data/products';
import { useCart } from '../context/CartContext';
import { FiSearch, FiPlus, FiMinus, FiTrash2, FiCreditCard, FiDollarSign, FiPrinter } from 'react-icons/fi';

export default function POSPage() {
  const [activeCategory, setActiveCategory] = useState('Burgers');
  const [search, setSearch] = useState('');
  const { cart, addToCart, removeFromCart, updateQty, clearCart, subtotal, tax, total } = useCart();

  const filtered = products.filter(p =>
    p.category === activeCategory &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 400px',
      gap: '1.5rem',
      height: 'calc(100vh - 140px)',
      animation: 'fadeIn 0.4s ease',
    }}>

      {/* Columna izquierda */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', overflow: 'hidden' }}>

        {/* Buscador */}
        <div style={{ position: 'relative' }}>
          <FiSearch style={{
            position: 'absolute', left: '1.25rem', top: '50%',
            transform: 'translateY(-50%)', color: '#a0aec0',
          }} />
          <input
            className="input"
            placeholder="Buscar productos por nombre..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              paddingLeft: '3rem',
              paddingTop: '1rem',
              paddingBottom: '1rem',
              fontSize: '0.95rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
              borderRadius: '0.85rem',
            }}
          />
        </div>

        {/* Categorías */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.65rem 1.35rem',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
                background: activeCategory === cat
                  ? 'linear-gradient(135deg, #3182ce, #2c5282)'
                  : 'white',
                color: activeCategory === cat ? 'white' : '#2c5282',
                boxShadow: activeCategory === cat
                  ? '0 6px 16px rgba(49,130,206,0.35)'
                  : '0 2px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease',
                transform: activeCategory === cat ? 'translateY(-2px)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid productos */}
        <div style={{
          flex: 1, overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1rem',
          paddingRight: '0.5rem',
          paddingBottom: '1rem',
        }}>
          {filtered.map((product, i) => (
            <div
              key={product.id}
              onClick={() => addToCart(product)}
              className="animate-pop-in"
              style={{
                animationDelay: `${i * 0.03}s`,
                background: 'white',
                borderRadius: '1rem',
                padding: '0.85rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                border: '2px solid transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 32px rgba(49,130,206,0.18)';
                e.currentTarget.style.borderColor = '#63b3ed';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <div style={{
                height: '110px',
                borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, #ebf8ff, #bee3f8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '3rem',
                marginBottom: '0.75rem',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <span style={{ position: 'relative', zIndex: 1 }}>{product.image}</span>
              </div>
              <h4 style={{
                fontSize: '0.85rem', fontWeight: 600,
                color: '#1e3a5f', marginBottom: '0.35rem',
                lineHeight: 1.3,
              }}>
                {product.name}
              </h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#3182ce' }}>
                  ${product.price.toFixed(2)}
                </p>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '8px',
                  background: 'linear-gradient(135deg, #4299e1, #3182ce)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', boxShadow: '0 2px 6px rgba(49,130,206,0.3)',
                }}>
                  <FiPlus size={14} />
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{
              gridColumn: '1 / -1', textAlign: 'center',
              padding: '4rem 2rem', color: '#a0aec0',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <p style={{ fontWeight: 600 }}>No se encontraron productos</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.35rem' }}>
                Intenta con otra categoría o búsqueda
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Carrito */}
      <div style={{
        background: 'white',
        borderRadius: '1.25rem',
        boxShadow: '0 10px 40px rgba(16,42,67,0.12)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid rgba(190,227,248,0.6)',
      }}>
        <div style={{
          padding: '1.5rem 1.5rem 1.25rem',
          background: 'linear-gradient(135deg, #2c5282, #3182ce)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '-40px', right: '-40px',
            width: '120px', height: '120px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.15), transparent)',
          }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>🛒 Orden Actual</h3>
              <p style={{ fontSize: '0.8rem', opacity: 0.85, marginTop: '0.25rem' }}>
                {cart.length} producto{cart.length !== 1 ? 's' : ''} en el carrito
              </p>
            </div>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none', color: 'white',
                  padding: '0.4rem 0.75rem', borderRadius: '0.5rem',
                  fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#a0aec0' }}>
              <div style={{
                fontSize: '4rem', marginBottom: '1rem',
                filter: 'grayscale(0.3)', opacity: 0.7,
              }}>🛒</div>
              <p style={{ fontWeight: 600, color: '#718096' }}>Carrito vacío</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: '#a0aec0' }}>
                Agrega productos para comenzar
              </p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="animate-slide-in" style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.85rem',
                borderRadius: '0.85rem',
                marginBottom: '0.6rem',
                background: 'linear-gradient(135deg, #f7fbff, #ebf8ff)',
                border: '1px solid rgba(190,227,248,0.6)',
              }}>
                <div style={{
                  fontSize: '1.75rem',
                  width: '44px', height: '44px',
                  borderRadius: '0.65rem',
                  background: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                  flexShrink: 0,
                }}>
                  {item.image}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontWeight: 600, fontSize: '0.85rem', color: '#1e3a5f',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#3182ce', fontWeight: 700, marginTop: '0.15rem' }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <button onClick={() => updateQty(item.id, item.qty - 1)} style={qtyBtn}>
                    <FiMinus size={11} />
                  </button>
                  <span style={{
                    fontWeight: 700, minWidth: '22px', textAlign: 'center',
                    fontSize: '0.9rem', color: '#1e3a5f',
                  }}>
                    {item.qty}
                  </span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} style={qtyBtn}>
                    <FiPlus size={11} />
                  </button>
                  <button onClick={() => removeFromCart(item.id)}
                    style={{ ...qtyBtn, color: '#e53e3e' }}>
                    <FiTrash2 size={11} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'linear-gradient(180deg, #f7fbff, white)',
          borderTop: '1px solid rgba(190,227,248,0.6)',
        }}>
          <Row label="Subtotal" value={subtotal} />
          <Row label="IVA (16%)" value={tax} />
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginTop: '0.85rem', paddingTop: '0.85rem',
            borderTop: '2px dashed #bee3f8',
          }}>
            <span style={{ fontWeight: 700, fontSize: '1rem', color: '#1e3a5f' }}>Total</span>
            <span style={{ fontWeight: 800, fontSize: '1.6rem', color: '#2c5282' }}>
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <div style={{ padding: '0 1.5rem 1.5rem', display: 'grid', gap: '0.6rem' }}>
          <button className="btn btn-accent" onClick={clearCart}
            style={{ padding: '1rem', borderRadius: '0.85rem', fontSize: '1rem' }}>
            <FiDollarSign /> Cobrar ${total.toFixed(2)}
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
            <button className="btn btn-primary" style={{ padding: '0.75rem' }}>
              <FiCreditCard /> Tarjeta
            </button>
            <button className="btn btn-warning" style={{ padding: '0.75rem' }}>
              <FiPrinter /> Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const qtyBtn = {
  width: '26px', height: '26px', borderRadius: '7px',
  border: 'none', background: 'white', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: '#3182ce', boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  transition: 'all 0.15s',
  flexShrink: 0,
};

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', fontSize: '0.9rem' }}>
      <span style={{ color: '#718096' }}>{label}</span>
      <span style={{ fontWeight: 600, color: '#1e3a5f' }}>${value.toFixed(2)}</span>
    </div>
  );
}