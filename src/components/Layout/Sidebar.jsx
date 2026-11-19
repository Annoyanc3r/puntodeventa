import { NavLink } from 'react-router-dom';
import {
  FiShoppingCart, FiBox, FiMapPin, FiCreditCard,
  FiUser, FiLogOut,
} from 'react-icons/fi';

const links = [
  { to: '/pos',           label: 'Punto de Venta', icon: <FiShoppingCart /> },
  { to: '/inventario',    label: 'Inventario',     icon: <FiBox /> },
  { to: '/sucursales',    label: 'Sucursales',     icon: <FiMapPin /> },
  { to: '/suscripciones', label: 'Suscripciones',  icon: <FiCreditCard /> },
  { to: '/perfil',        label: 'Mi Perfil',      icon: <FiUser /> },
];

export default function Sidebar() {
  const handleLogout = () => {
    try {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('usuario');
      sessionStorage.removeItem('user_Email');
      sessionStorage.removeItem('user_ID');
      sessionStorage.removeItem('ultimo_ticket_pos');
      sessionStorage.clear();
      localStorage.removeItem('token');
    } catch {
      // Ignorar errores de almacenamiento
    }

    window.location.replace('/login');
  };

  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      background: '#102a43',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.75rem 0',
      boxShadow: '4px 0 24px rgba(10, 25, 41, 0.15)',
      flexShrink: 0,
    }}>
      {/* ===== LOGO DE ARRIBA ===== */}
      <div style={{ padding: '0 1.5rem 2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: '#4299e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
            boxShadow: '0 4px 12px rgba(66,153,225,0.4)',
          }}>
          </div>

          <div>
            <h1 style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              lineHeight: 1,
            }}>
              POS <span style={{ color: '#63b3ed' }}>Blue</span>
            </h1>
            <p style={{
              fontSize: '0.7rem',
              color: '#63b3ed',
              marginTop: '0.2rem',
              fontWeight: 500,
            }}>
              SISTEMA DE VENTAS
            </p>
          </div>
        </div>
      </div>

      {/* ===== MENÚ DE NAVEGACIÓN ===== */}
      <nav style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.35rem',
        padding: '0 0.75rem',
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
              background: isActive ? '#2c5282' : 'transparent',
              textDecoration: 'none',
              fontWeight: isActive ? 600 : 500,
              fontSize: '0.9rem',
              transition: 'all 0.2s',
              borderLeft: isActive ? '3px solid #4299e1' : '3px solid transparent',
            })}
            onMouseEnter={e => {
              if (e.currentTarget.getAttribute('aria-current') !== 'page') {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={e => {
              if (e.currentTarget.getAttribute('aria-current') !== 'page') {
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

      {/* ===== BOTÓN CERRAR SESIÓN (ABAJO) ===== */}
      <div style={{
        padding: '1rem 1.5rem 0',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        marginTop: '1rem',
      }}>
        <button
          type="button"
          className="btn"
          onClick={handleLogout}
          style={{
            width: '100%',
            background: 'rgba(229, 62, 62, 0.15)',
            color: '#fc8181',
            border: '1px solid rgba(229, 62, 62, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
            fontFamily: 'inherit',
          }}
        >
          <FiLogOut /> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}