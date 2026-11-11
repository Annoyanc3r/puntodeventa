import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { login } from '../services/authService';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      const { token, usuario } = await login(email, password);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      navigate('/pos', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (


    
    <div style={authContainer}>
      <div style={authCard}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary-800)' }}>
            <span style={{ color: 'var(--primary-500)' }}>POS</span> Blue
          </h1>
          <p style={{ color: '#718096', marginTop: '0.5rem' }}>Inicia sesión en tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Correo electrónico</label>
            <div style={{ position: 'relative' }}>
              <FiMail style={inputIcon} />
              <input
                className="input"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                style={{ paddingLeft: '2.75rem' }}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Contraseña</label>
            <div style={{ position: 'relative' }}>
              <FiLock style={inputIcon} />
              <input
                className="input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={{ paddingLeft: '2.75rem' }}
              />
            </div>
          </div>

          {error && (
            <div style={{ background: '#fed7d7', color: '#c53030', padding: '0.6rem 0.8rem', borderRadius: '0.5rem', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4a5568' }}>
              <input type="checkbox" /> Recordarme
            </label>
            <a href="#" style={{ color: 'var(--primary-500)', fontWeight: 600, textDecoration: 'none' }}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="btn btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '0.5rem',
              opacity: cargando ? 0.7 : 1,
              cursor: cargando ? 'not-allowed' : 'pointer',
            }}
          >
            <FiLogIn /> {cargando ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#718096', fontSize: '0.9rem' }}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" style={{ color: 'var(--primary-500)', fontWeight: 600, textDecoration: 'none' }}>
            Regístrate ahora
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

const inputIcon = {
  position: 'absolute',
  left: '1rem',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#a0aec0',
};

// ...tus estilos authContainer, authCard, labelStyle, inputIcon sin cambios