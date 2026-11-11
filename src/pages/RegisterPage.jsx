import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: '',
    acepta: false,
  });
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validaciones del lado del cliente
    if (!form.acepta) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (form.password !== form.confirmar) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setCargando(true);
    try {
      await register({
        nombre: form.nombre.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      // Éxito: redirigimos al login
      navigate('/login', { replace: true });
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
            Crear Cuenta
          </h1>
          <p style={{ color: '#718096', marginTop: '0.5rem' }}>
            Comienza tu prueba gratuita de 7 días
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Nombre</label>
            <input
              className="input"
              name="nombre"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>

          <div>
            <label style={labelStyle}>Correo electrónico</label>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label style={labelStyle}>Contraseña</label>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>

          <div>
            <label style={labelStyle}>Confirmar contraseña</label>
            <input
              className="input"
              type="password"
              name="confirmar"
              placeholder="••••••••"
              value={form.confirmar}
              onChange={handleChange}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#4a5568' }}>
            <input
              type="checkbox"
              name="acepta"
              checked={form.acepta}
              onChange={handleChange}
            />
            Acepto todos los términos y condiciones
          </label>

          {error && (
            <div style={{ background: '#fed7d7', color: '#c53030', padding: '0.6rem 0.8rem', borderRadius: '0.5rem', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="btn btn-accent"
            style={{
              marginTop: '0.5rem',
              opacity: cargando ? 0.7 : 1,
              cursor: cargando ? 'not-allowed' : 'pointer',
            }}
          >
            {cargando ? 'Registrando...' : 'Registrarme'}
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

// ======= Estilos (fuera del componente, igual que antes) =======
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