import { FiUser, FiCalendar } from 'react-icons/fi';

export default function Topbar() {
  return (
    <header style={{
      height: '70px',
      background: 'white',
      borderBottom: '1px solid var(--primary-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary-800)' }}>
          ¡Bienvenido de nuevo! 👋
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#718096' }}>
          Aquí está el resumen de tu negocio hoy
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-600)' }}>
          <FiCalendar /> <span style={{ fontSize: '0.9rem' }}>{new Date().toLocaleDateString()}</span>
        </div>
        <div style={{
          width: '42px', height: '42px', borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary-400), var(--primary-600))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 600,
        }}>
          <FiUser />
        </div>
      </div>
    </header>
  );
}