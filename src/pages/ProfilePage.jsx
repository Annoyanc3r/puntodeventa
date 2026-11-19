import { useState, useEffect } from 'react';
import { FiUser, FiMapPin, FiCreditCard, FiCheck } from 'react-icons/fi';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const PLANES = [
  {
    id: 'prueba',
    titulo: '7 días gratis',
    precio: 50,
    periodo: 'con un mes de uso',
    caracteristicas: ['Acceso completo', 'Documentación', 'Soporte al cliente'],
  },
  {
    id: '1_ano',
    titulo: 'Suscripción 1 Año',
    precio: 235,
    periodo: 'por año',
    caracteristicas: ['Acceso completo', 'Documentación', 'Soporte al cliente', 'Actualizaciones gratis'],
    destacado: true,
  },
  {
    id: '3_anos',
    titulo: 'Suscripción 3 Años',
    precio: 450,
    periodo: 'cada 3 años',
    caracteristicas: ['Acceso completo', 'Documentación', 'Soporte al cliente', 'Actualizaciones gratis', 'Dominios ilimitados'],
  },
];

const mapearNombreAIdPlan = (nombrePlan = '') => {
  const n = nombrePlan.toLowerCase();
  if (n.includes('7') || n.includes('prueba')) return 'prueba';
  if (n.includes('3')) return '3_anos';
  return '1_ano';
};

export default function ProfilePage() {
  const usuarioSessionRaw = sessionStorage.getItem('usuario');
  const usuarioSession = usuarioSessionRaw ? JSON.parse(usuarioSessionRaw) : null;
  const userId = usuarioSession?._id || sessionStorage.getItem('user_ID') || '';
  const userEmail = usuarioSession?.email || sessionStorage.getItem('user_Email') || 'Default@posblue.com';

  const [usuario, setUsuario] = useState({
    nombre: usuarioSession?.nombre || 'Default POS',
    email: userEmail,
    rol: usuarioSession?.rol || 'admin',
  });

  const [sucursal, setSucursal] = useState({
    nombre: 'Sin sucursal registrada',
    direccion: 'Registra una sucursal en el módulo Sucursales',
    zipCode: '—',
  });

  const [empresaId, setEmpresaId] = useState(null);
  const [suscripcionActiva, setSuscripcionActiva] = useState(null);
  const [planSeleccionado, setPlanSeleccionado] = useState('prueba');
  const [mensaje, setMensaje] = useState('');
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const cargarDatosPerfil = async () => {
      if (!userId) return;

      try {
        // 1. Obtener sucursales y empresaId del usuario
        const resSuc = await fetch(`${API_BASE}/api/sucursal/Sucursal_Usuario/${userId}`);
        if (resSuc.ok) {
          const dataSuc = await resSuc.json();
          if (dataSuc.empresaId) {
            setEmpresaId(dataSuc.empresaId);
          }
          if (Array.isArray(dataSuc.sucursales) && dataSuc.sucursales.length > 0) {
            const primera = dataSuc.sucursales[0];
            setSucursal({
              nombre: primera.nombre || 'Sucursal Activa',
              direccion: primera.direccion || 'Sin dirección',
              zipCode: primera.codigoPostal || primera.telefono || '—',
            });
          }
        }
      } catch {
        // Mantiene estado inicial si aún no hay sucursales
      }

      try {
        // 2. Verificar suscripción activa por correo
        if (userEmail && userEmail.includes('@')) {
          const resSub = await fetch(`${API_BASE}/api/usuario/checkSubscription/${encodeURIComponent(userEmail)}`);
          if (resSub.ok) {
            const dataSub = await resSub.json();
            if (dataSub?.subscripcion?.empresa) {
              setEmpresaId((prev) => prev || dataSub.subscripcion.empresa);
            }
          }
        }
      } catch {
        // Sin fallo si no responde
      }
    };

    cargarDatosPerfil();
  }, [userId, userEmail]);

  useEffect(() => {
    const cargarSubscripcionDetalle = async () => {
      if (!empresaId) return;
      try {
        const res = await fetch(`${API_BASE}/api/empresa-subscripcion/empresa/${empresaId}`);
        if (res.ok) {
          const data = await res.json();
          setSuscripcionActiva(data);
          if (data?.subscripcion?.nombre) {
            setPlanSeleccionado(mapearNombreAIdPlan(data.subscripcion.nombre));
          }
        }
      } catch {
        // Sin suscripción activa registrada
      }
    };
    cargarSubscripcionDetalle();
  }, [empresaId]);

  const seleccionarPlan = async (plan) => {
    setGuardando(true);
    setMensaje('');
    try {
      const token = sessionStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/empresa-subscripcion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          plan: plan.titulo,
          precio: Number(plan.precio),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.msg || 'No se pudo actualizar el plan');
      }

      setPlanSeleccionado(plan.id);
      setSuscripcionActiva(data);
      setMensaje(`Plan "${plan.titulo}" guardado en MongoDB.`);
    } catch (err) {
      setMensaje(err.message || 'Error al actualizar el plan');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* ====== TÍTULO ====== */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e3a5f' }}>
          👤 Mi Perfil
        </h1>
        <p style={{ color: '#718096', marginTop: '0.25rem' }}>
          Información de tu cuenta, sucursal activa y suscripción en base de datos
        </p>
      </div>

      {/* ====== FILA 1: USUARIO Y SUCURSAL ====== */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Tarjeta de Usuario */}
        <div style={tarjetaStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: '#4299e1',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '1.75rem',
            }}>
              <FiUser />
            </div>
            <div>
              <h2 style={{ color: '#1e3a5f', fontSize: '1.25rem' }}>{usuario.nombre}</h2>
              <p style={{ color: '#718096', fontSize: '0.9rem' }}>{usuario.email}</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #ebf8ff', paddingTop: '1rem' }}>
            <FilaDato etiqueta="Rol" valor={usuario.rol} />
            <FilaDato etiqueta="Estado" valor="Activo" />
            {suscripcionActiva?.fechaFin && (
              <FilaDato
                etiqueta="Vence suscripción"
                valor={new Date(suscripcionActiva.fechaFin).toLocaleDateString()}
              />
            )}
          </div>
        </div>

        {/* Tarjeta de Sucursal */}
        <div style={tarjetaStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: '#38a169',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '1.75rem',
            }}>
              <FiMapPin />
            </div>
            <div>
              <h2 style={{ color: '#1e3a5f', fontSize: '1.25rem' }}>{sucursal.nombre}</h2>
              <p style={{ color: '#718096', fontSize: '0.9rem' }}>Sucursal activa</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #ebf8ff', paddingTop: '1rem' }}>
            <FilaDato etiqueta="Dirección" valor={sucursal.direccion} />
            <FilaDato etiqueta="Dato / Teléfono" valor={sucursal.zipCode} />
          </div>
        </div>
      </div>

      {/* ====== SECCIÓN DE SUSCRIPCIONES ====== */}
      <div style={tarjetaStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '12px',
            background: '#ebf8ff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#3182ce', fontSize: '1.25rem',
          }}>
            <FiCreditCard />
          </div>
          <div>
            <h2 style={{ color: '#1e3a5f', fontSize: '1.25rem' }}>Planes de Suscripción</h2>
            <p style={{ color: '#718096', fontSize: '0.85rem' }}>
              Elige el plan para tu negocio (se guarda en MongoDB)
            </p>
          </div>
        </div>

        {mensaje && (
          <div style={{
            marginBottom: '1rem',
            padding: '0.75rem 1rem',
            borderRadius: '0.65rem',
            background: '#ebf8ff',
            color: '#2c5282',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}>
            {mensaje}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {PLANES.map((plan) => {
            const estaSeleccionado = planSeleccionado === plan.id;

            return (
              <div
                key={plan.id}
                style={{
                  background: estaSeleccionado ? '#3182ce' : 'white',
                  color: estaSeleccionado ? 'white' : '#1e3a5f',
                  border: estaSeleccionado ? '2px solid #2c5282' : '2px solid #ebf8ff',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                {plan.destacado && (
                  <span style={{
                    position: 'absolute', top: '-10px', right: '1rem',
                    background: '#ed8936', color: 'white',
                    padding: '0.25rem 0.75rem', borderRadius: '1rem',
                    fontSize: '0.7rem', fontWeight: 700,
                  }}>
                    POPULAR
                  </span>
                )}

                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {plan.titulo}
                </h3>
                <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                  ${plan.precio}
                </div>
                <p style={{
                  fontSize: '0.8rem',
                  color: estaSeleccionado ? 'rgba(255,255,255,0.8)' : '#718096',
                  marginBottom: '1rem',
                }}>
                  {plan.periodo}
                </p>

                <ul style={{ listStyle: 'none', flex: 1, marginBottom: '1rem' }}>
                  {plan.caracteristicas.map((c, i) => (
                    <li key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      fontSize: '0.85rem', marginBottom: '0.5rem',
                    }}>
                      <FiCheck size={14} />
                      {c}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  disabled={guardando}
                  onClick={() => seleccionarPlan(plan)}
                  style={{
                    background: estaSeleccionado ? 'white' : '#3182ce',
                    color: estaSeleccionado ? '#3182ce' : 'white',
                    border: 'none', padding: '0.75rem',
                    borderRadius: '0.5rem', fontWeight: 600,
                    cursor: guardando ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                  }}
                >
                  {guardando ? 'Guardando...' : estaSeleccionado ? 'Plan Actual' : 'Seleccionar'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FilaDato({ etiqueta, valor }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      padding: '0.5rem 0', fontSize: '0.9rem',
    }}>
      <span style={{ color: '#718096' }}>{etiqueta}</span>
      <span style={{ fontWeight: 600, color: '#1e3a5f' }}>{valor}</span>
    </div>
  );
}

const tarjetaStyle = {
  background: 'white',
  borderRadius: '1rem',
  padding: '1.5rem',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
};