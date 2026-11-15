import { useState, useEffect } from 'react';
import { FiUser, FiMapPin, FiCreditCard, FiLogOut, FiCheck } from 'react-icons/fi';

// ==== DATOS DE PRUEBA (para que se vea funcionando) ====
const USUARIO_PRUEBA = {
  nombre: 'Admin POS',
  email: 'admin@posblue.com',
  rol: 'Administrador',
};

const SUCURSAL_PRUEBA = {
  nombre: 'Sucursal Centro',
  direccion: 'Calle Washington 123',
  zipCode: '64890',
};

// Los 3 planes de suscripción del documento
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

export default function ProfilePage() {
  const [usuario, setUsuario] = useState(USUARIO_PRUEBA);
  const [sucursal, setSucursal] = useState(SUCURSAL_PRUEBA);
  const [planSeleccionado, setPlanSeleccionado] = useState('1_ano');

  // Esta función se ejecuta cuando cambias de plan
  const seleccionarPlan = (idPlan) => {
    console.log('El usuario seleccionó el plan: ' + idPlan);
    setPlanSeleccionado(idPlan);
    alert('Has seleccionado el plan: ' + idPlan + '. Aquí iría el cobro.');
  };

  const cerrarSesion = () => {
    console.log('Cerrando sesión...');
    alert('Aquí iría la función de cerrar sesión');
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* ====== TÍTULO ====== */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e3a5f' }}>
          👤 Mi Perfil
        </h1>
        <p style={{ color: '#718096', marginTop: '0.25rem' }}>
          Aquí puedes ver tu información, la sucursal y los planes disponibles
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
            <FilaDato etiqueta="Estado" valor="Activo ✅" />
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
            <FilaDato etiqueta="Código Postal" valor={sucursal.zipCode} />
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
            <p style={{ color: '#718096', fontSize: '0.85rem' }}>Elige el plan que mejor se adapte a tu negocio</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {PLANES.map(plan => {
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
                  onClick={() => seleccionarPlan(plan.id)}
                  style={{
                    background: estaSeleccionado ? 'white' : '#3182ce',
                    color: estaSeleccionado ? '#3182ce' : 'white',
                    border: 'none', padding: '0.75rem',
                    borderRadius: '0.5rem', fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  {estaSeleccionado ? 'Plan Actual ✅' : 'Seleccionar'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ====== BOTÓN DE CERRAR SESIÓN ====== */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={cerrarSesion}
          className="btn btn-danger"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <FiLogOut /> Cerrar Sesión
        </button>
      </div>

    </div>
  );
}

// --- Componente pequeño para mostrar una fila de dato ---
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

// --- Estilo reutilizable para las tarjetas ---
const tarjetaStyle = {
  background: 'white',
  borderRadius: '1rem',
  padding: '1.5rem',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
};