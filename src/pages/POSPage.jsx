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
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem', height: 'calc(100vh - 140px)' }}>

      {/* Columna izquierda - Productos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', overflow: 'hidden' }}>

        {/* Buscador */}
        <div style={{ position: 'relative' }}>
          <FiSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
          <input
            className="input"
            placeholder="Buscar productos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '2.75rem' }}
          />
        </div>

        {/* Categorías */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '2rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
                whiteSpace: 'nowrap',
                background: activeCategory === cat ? 'var(--primary-600)' : 'white',
                color: activeCategory === cat ? 'white' : 'var(--primary-700)',
                boxShadow: activeCategory === cat ? 'var(--shadow-md)' : '0 1px 2px rgba(0,0,0,0.05)',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        <div style={{
          flex: 1, overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '1rem',
          paddingRight: '0.5rem',
        }}>
          {filtered.map(product => (
            <div
              key={product.id}
              onClick={() => addToCart(product)}
              style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '1rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all 0.2s',
                border: '2px solid transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                e.currentTarget.style.borderColor = 'var(--primary-400)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <div style={{
                height: '90px',
                borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, var(--primary-50), var(--primary-100))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.5rem',
                marginBottom: '0.75rem',
              }}>
                {product.image}
              </div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-800)', marginBottom: '0.25rem' }}>
                {product.name}
              </h4>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-500)' }}>
                ${product.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Columna derecha - Carrito */}
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'linear-gradient(135deg, var(--primary-600), var(--primary-500))',
          color: 'white',
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>🛒 Orden Actual</h3>
          <p style={{ fontSize: '0.8rem', opacity: 0.85, marginTop: '0.25rem' }}>
            {cart.length} producto{cart.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#a0aec0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
              <p>Carrito vacío</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Agrega productos para comenzar</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: '0.75rem',
                marginBottom: '0.5rem',
                background: 'var(--primary-50)',
              }}>
                <div style={{ fontSize: '1.5rem' }}>{item.image}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary-800)' }}>{item.name}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--primary-500)', fontWeight: 600 }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <button onClick={() => updateQty(item.id, item.qty - 1)} style={qtyBtn}>
                    <FiMinus size={12} />
                  </button>
                  <span style={{ fontWeight: 600, minWidth: '20px', textAlign: 'center', fontSize: '0.85rem' }}>
                    {item.qty}
                  </span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} style={qtyBtn}>
                    <FiPlus size={12} />
                  </button>
                  <button onClick={() => removeFromCart(item.id)} style={{ ...qtyBtn, color: 'var(--danger)' }}>
                    <FiTrash2 size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totales */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '2px dashed var(--primary-100)' }}>
          <Row label="Subtotal" value={subtotal} />
          <Row label="IVA (16%)" value={tax} />
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginTop: '0.75rem', paddingTop: '0.75rem',
            borderTop: '1px solid var(--primary-100)',
          }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary-800)' }}>Total</span>
            <span style={{ fontWeight: 700, fontSize: '1.4rem', color: 'var(--primary-600)' }}>
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Botones de acción */}
        <div style={{ padding: '0 1.5rem 1.5rem', display: 'grid', gap: '0.5rem' }}>
          <button className="btn btn-accent" style={actionBtn} onClick={clearCart}>
            <FiDollarSign /> Cobrar ${total.toFixed(2)}
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button className="btn btn-primary" style={actionBtn}><FiCreditCard /> Tarjeta</button>
            <button className="btn btn-warning" style={actionBtn}><FiPrinter /> Imprimir</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const qtyBtn = {
  width: '24px', height: '24px', borderRadius: '6px',
  border: 'none', background: 'white', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'var(--primary-600)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
};

const actionBtn = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  gap: '0.5rem', padding: '0.85rem',
};

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.9rem' }}>
      <span style={{ color: '#718096' }}>{label}</span>
      <span style={{ fontWeight: 600, color: 'var(--primary-800)' }}>${value.toFixed(2)}</span>
    </div>
  );
}