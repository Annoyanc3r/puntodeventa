import { NavLink } from 'react-router-dom';
import { FiShoppingCart, FiBox, FiMapPin, FiSettings, FiLogOut } from 'react-icons/fi';
import { FiCreditCard } from 'react-icons/fi';

const links = [
  { to: '/pos',            label: 'Punto de Venta', icon: <FiShoppingCart /> },
  { to: '/inventario',     label: 'Inventario',     icon: <FiBox /> },
  { to: '/sucursales',     label: 'Sucursales',     icon: <FiMapPin /> },
  { to: '/suscripciones',  label: 'Suscripciones',  icon: <FiCreditCard /> },
  { to: '/ajustes',        label: 'Ajustes',        icon: <FiSettings /> },
];

export default function Sidebar() {
  return (
    <aside style={{
      width: '240px',
      background: 'linear-gradient(180deg, var(--primary-800) 0%, var(--primary-900) 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 0',
      boxShadow: 'var(--shadow-lg)',
    }}>
      <div style={{ padding: '0 1.5rem 2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.5px' }}>
          <span style={{ color: 'var(--primary-300)' }}>POS</span> Blue
        </h1>
        <p style={{ fontSize: '0.75rem', color: 'var(--primary-300)', marginTop: '0.25rem' }}>
          Sistema de Ventas
        </p>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0 0.75rem' }}>
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.85rem 1rem',
              borderRadius: '0.5rem',
              color: isActive ? 'white' : 'var(--primary-300)',
              background: isActive ? 'var(--primary-600)' : 'transparent',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'all 0.2s',
            })}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '1rem 1.5rem' }}>
        <button className="btn btn-danger" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <FiLogOut /> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}