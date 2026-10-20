import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <div style={authContainer}>
      <div style={authCard}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary-800)' }}>
            Crear Cuenta
          </h1>
          <p style={{ color: '#718096', marginTop: '0.5rem' }}>
            Comienza tu prueba gratuita de 7 días
          </p>
        </div>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Nombre</label>
            <input className="input" placeholder="Tu nombre" />
          </div>
          <div>
            <label style={labelStyle}>Correo electrónico</label>
            <input className="input" type="email" placeholder="tu@email.com" />
          </div>
          <div>
            <label style={labelStyle}>Contraseña</label>
            <input className="input" type="password" placeholder="••••••••" />
          </div>
          <div>
            <label style={labelStyle}>Confirmar contraseña</label>
            <input className="input" type="password" placeholder="••••••••" />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#4a5568' }}>
            <input type="checkbox" /> Acepto todos los términos y condiciones
          </label>
          <button className="btn btn-accent" style={{ marginTop: '0.5rem' }}>
            Registrarme
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#718096', fontSize: '0.9rem' }}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={{ color: 'var(--primary-500)', fontWeight: 600, textDecoration: 'none' }}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

const authContainer = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  background: 'linear-gradient(135deg, #ebf8ff 0%, #bee3f8 50%, #90cdf4 100%)',
};

const authCard = {
  background: 'white',
  borderRadius: '1.5rem',
  padding: '2.5rem',
  width: '100%',
  maxWidth: '420px',
  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: 'var(--primary-700)',
  marginBottom: '0.35rem',
};