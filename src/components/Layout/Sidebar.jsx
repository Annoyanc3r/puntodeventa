import { NavLink } from 'react-router-dom';
import { 
  FiShoppingCart, FiBox, FiMapPin, FiSettings, 
  FiLogOut, FiCreditCard 
} from 'react-icons/fi';

const links = [
  { to: '/pos',           label: 'Punto de Venta', icon: <FiShoppingCart /> },
  { to: '/inventario',    label: 'Inventario',     icon: <FiBox /> },
  { to: '/sucursales',    label: 'Sucursales',     icon: <FiMapPin /> },
  { to: '/suscripciones', label: 'Suscripciones',  icon: <FiCreditCard /> },
  { to: '/ajustes',       label: 'Ajustes',        icon: <FiSettings /> },
];

export default function Sidebar() {
  return (
    <aside style={{
      width: '260px',
      background: 'linear-gradient(180deg, #102a43 0%, #0a1929 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.75rem 0',
      boxShadow: '4px 0 24px rgba(10, 25, 41, 0.15)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Círculo decorativo */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '200px', height: '200px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(66,153,225,0.15), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ padding: '0 1.5rem 2.5rem', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #4299e1, #38b2ac)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.3rem', boxShadow: '0 4px 12px rgba(66,153,225,0.4)',
          }}>
            🚀
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1 }}>
              POS <span style={{ color: '#63b3ed' }}>Easyteller</span>
            </h1>
            <p style={{ fontSize: '0.7rem', color: '#63b3ed', marginTop: '0.2rem', fontWeight: 500 }}>
              SISTEMA DE VENTAS
            </p>
          </div>
        </div>
      </div>

      <nav style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        gap: '0.35rem', padding: '0 0.75rem', position: 'relative',
      }}>
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              padding: '0.9rem 1rem',
              borderRadius: '0.75rem',
              color: isActive ? 'white' : '#a0c4e8',
              background: isActive
                ? 'linear-gradient(135deg, rgba(66,153,225,0.25), rgba(56,178,172,0.15))'
                : 'transparent',
              textDecoration: 'none',
              fontWeight: isActive ? 600 : 500,
              fontSize: '0.9rem',
              transition: 'all 0.2s',
              borderLeft: isActive ? '3px solid #4299e1' : '3px solid transparent',
              position: 'relative',
            })}
            onMouseEnter={e => {
              if (!e.currentTarget.style.background.includes('linear')) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={e => {
              const isActive = e.currentTarget.getAttribute('aria-current') === 'page';
              if (!isActive) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#a0c4e8';
              }
            }}
          >
            <span style={{ fontSize: '1.15rem', display: 'flex' }}>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '1rem 1.5rem 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button
          className="btn"
          style={{
            width: '100%',
            background: 'rgba(229, 62, 62, 0.15)',
            color: '#fc8181',
            border: '1px solid rgba(229, 62, 62, 0.3)',
          }}
        >
          <FiLogOut /> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}