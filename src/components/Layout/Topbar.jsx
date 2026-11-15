import { Link } from 'react-router-dom';
import { FiUser, FiCalendar, FiBell } from 'react-icons/fi';

export default function Topbar() {
  // Sacamos la fecha de hoy en formato bonito
  const hoy = new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header style={{
      height: '76px',
      background: 'rgba(255, 255, 255, 0.95)', // Blanco casi sólido
      borderBottom: '1px solid #bee3f8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      flexShrink: 0, // Evita que se encoja
    }}>

      {/* ===== LADO IZQUIERDO: Saludo ===== */}
      <div>
        <h2 style={{
          fontSize: '1.15rem',
          fontWeight: 700,
          color: '#1e3a5f',
        }}>
          ¡Bienvenido de nuevo! 👋
        </h2>
        <p style={{
          fontSize: '0.8rem',
          color: '#718096',
          marginTop: '0.15rem',
        }}>
          Aquí está el resumen de tu negocio
        </p>
      </div>

      {/* ===== LADO DERECHO: Fecha, campana y avatar ===== */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>

        {/* Fecha de hoy */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'white',
          padding: '0.55rem 1rem',
          borderRadius: '2rem',
          fontSize: '0.8rem',
          color: '#2c5282',
          fontWeight: 500,
          boxShadow: '0 2px 8px rgba(49,130,206,0.08)',
        }}>
          <FiCalendar size={14} />
          <span style={{ textTransform: 'capitalize' }}>{hoy}</span>
        </div>

        {/* Campanita de notificaciones */}
        <button style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          border: 'none',
          background: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#2c5282',
          boxShadow: '0 2px 8px rgba(49,130,206,0.08)',
          position: 'relative',
        }}>
          <FiBell />
          {/* Puntito rojo de "hay notificaciones" */}
          <span style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#e53e3e',
            border: '2px solid white',
          }} />
        </button>

        {/* Avatar del usuario (CLICKEABLE PARA IR AL PERFIL) */}
        <Link
          to="/perfil"
          title="Ir a mi perfil"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: '#4299e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '1rem',
            boxShadow: '0 4px 12px rgba(66,153,225,0.3)',
            transition: 'transform 0.2s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <FiUser />
          </div>
        </Link>
      </div>
    </header>
  );
}