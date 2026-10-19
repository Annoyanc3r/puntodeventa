import { FiUser, FiCalendar, FiBell } from 'react-icons/fi';

export default function Topbar() {
  const today = new Date().toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <header style={{
      height: '76px',
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(190, 227, 248, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <div>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e3a5f' }}>
          ¡Bienvenido de nuevo! 👋
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#718096', marginTop: '0.15rem' }}>
          Aquí está el resumen de tu negocio
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'white', padding: '0.55rem 1rem',
          borderRadius: '2rem', fontSize: '0.8rem',
          color: '#2c5282', fontWeight: 500,
          boxShadow: '0 2px 8px rgba(49,130,206,0.08)',
        }}>
          <FiCalendar size={14} />
          <span style={{ textTransform: 'capitalize' }}>{today}</span>
        </div>

        <button style={{
          width: '42px', height: '42px', borderRadius: '12px',
          border: 'none', background: 'white', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#2c5282', boxShadow: '0 2px 8px rgba(49,130,206,0.08)',
          position: 'relative',
        }}>
          <FiBell />
          <span style={{
            position: 'absolute', top: '10px', right: '10px',
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#e53e3e', border: '2px solid white',
          }} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #4299e1, #3182ce)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: '1rem',
            boxShadow: '0 4px 12px rgba(66,153,225,0.3)',
          }}>
            <FiUser />
          </div>
          <div style={{ display: 'none' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}