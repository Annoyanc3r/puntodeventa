import { Link } from 'react-router-dom';
import {
  FiCheck, FiArrowRight, FiShoppingCart, FiBox, FiUsers,
  FiTrendingUp, FiClock, FiShield, FiStar, FiZap,
} from 'react-icons/fi';

// ===== LOS 3 PLANES (los mismos de tu documento) =====
const PLANES = [
  {
    id: 'prueba',
    titulo: '7 días gratis',
    precio: 50,
    periodo: 'con un mes de uso',
    caracteristicas: [
      'Acceso completo',
      'Documentación',
      'Soporte al cliente',
      'Actualizaciones gratis',
    ],
    boton: 'Comenzar Prueba',
  },
  {
    id: '1_ano',
    titulo: 'Suscripción 1 Año',
    precio: 235,
    periodo: 'por año',
    caracteristicas: [
      'Acceso completo',
      'Documentación',
      'Soporte al cliente',
      'Actualizaciones gratis',
      'Dominios ilimitados',
    ],
    destacado: true,
    boton: 'Suscribirse Ahora',
  },
  {
    id: '3_anos',
    titulo: 'Suscripción 3 Años',
    precio: 450,
    periodo: 'cada 3 años',
    caracteristicas: [
      'Acceso completo',
      'Documentación',
      'Soporte al cliente',
      'Actualizaciones gratis',
      'Dominios ilimitados',
    ],
    boton: 'Mejor Valor',
  },
];

// ===== VENTAJAS DEL SISTEMA =====
const VENTAJAS = [
  {
    icono: <FiZap />,
    titulo: 'Rápido y fácil de usar',
    texto: 'Interfaz intuitiva que cualquier empleado puede aprender en minutos.',
  },
  {
    icono: <FiBox />,
    titulo: 'Control de inventario',
    texto: 'Administra productos, existencias y precios desde un solo lugar.',
  },
  {
    icono: <FiUsers />,
    titulo: 'Multi-sucursal',
    texto: 'Gestiona varias sucursales con inventarios independientes.',
  },
  {
    icono: <FiTrendingUp />,
    titulo: 'Reportes en tiempo real',
    texto: 'Consulta tus ventas del día y toma mejores decisiones.',
  },
  {
    icono: <FiClock />,
    titulo: 'Pedidos en cocina',
    texto: 'Envía pedidos directo a cocina y da seguimiento a cada orden.',
  },
  {
    icono: <FiShield />,
    titulo: 'Seguro y confiable',
    texto: 'Tus datos respaldados en la nube, disponibles cuando los necesites.',
  },
];

// ===== COMPARATIVA =====
const COMPARATIVA = [
  { feature: 'Fácil de usar',     pos: true,  tradicional: false },
  { feature: 'Control de inventario', pos: true, tradicional: false },
  { feature: 'Multi-sucursal',    pos: true,  tradicional: false },
  { feature: 'Reportes automáticos', pos: true, tradicional: false },
  { feature: 'Pedidos en cocina', pos: true,  tradicional: false },
  { feature: 'Acceso desde cualquier lugar', pos: true, tradicional: false },
  { feature: 'Precio accesible',  pos: true,  tradicional: true },
  { feature: 'Curva de aprendizaje corta', pos: true, tradicional: false },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f0f9ff' }}>

      {/* ============================================ */}
      {/* BARRA DE NAVEGACIÓN SUPERIOR                  */}
      {/* ============================================ */}
      <header style={{
        background: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '10px',
            background: '#4299e1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.25rem',
          }}>
            🚀
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e3a5f', lineHeight: 1 }}>
              POS <span style={{ color: '#3182ce' }}>Blue</span>
            </h1>
            <p style={{ fontSize: '0.65rem', color: '#718096', fontWeight: 500, letterSpacing: '0.5px' }}>
              SISTEMA DE VENTAS
            </p>
          </div>
        </div>

        {/* Botones de login / registro */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/login" style={{
            padding: '0.6rem 1.25rem',
            borderRadius: '0.5rem',
            border: '2px solid #3182ce',
            color: '#3182ce',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '0.9rem',
          }}>
            Iniciar Sesión
          </Link>
          <Link to="/register" style={{
            padding: '0.6rem 1.25rem',
            borderRadius: '0.5rem',
            background: '#3182ce',
            color: 'white',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '0.9rem',
            boxShadow: '0 4px 12px rgba(49,130,206,0.3)',
          }}>
            Registrarse
          </Link>
        </div>
      </header>

      {/* ============================================ */}
      {/* SECCIÓN HERO (PRINCIPAL)                      */}
      {/* ============================================ */}
      <section style={{
        padding: '5rem 2rem',
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'center',
      }}>
        <div>
          <span style={{
            display: 'inline-block',
            background: '#ebf8ff',
            color: '#2c5282',
            padding: '0.4rem 1rem',
            borderRadius: '2rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '1px',
            marginBottom: '1.5rem',
          }}>
            ⚡ SISTEMA DE PUNTO DE VENTA
          </span>

          <h1 style={{
            fontSize: '3rem',
            fontWeight: 800,
            color: '#1e3a5f',
            lineHeight: 1.1,
            marginBottom: '1.25rem',
          }}>
            El sistema POS que tu negocio necesita
          </h1>

          <p style={{
            fontSize: '1.1rem',
            color: '#4a5568',
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}>
            Administra tu inventario, sucursales y ventas desde un solo lugar.
            Rápido, fácil de usar y con todo lo que necesitas para crecer.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/register" style={{
              padding: '0.9rem 2rem',
              borderRadius: '0.75rem',
              background: '#3182ce',
              color: 'white',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 6px 20px rgba(49,130,206,0.35)',
            }}>
              Comenzar gratis <FiArrowRight />
            </Link>
            <Link to="/login" style={{
              padding: '0.9rem 2rem',
              borderRadius: '0.75rem',
              background: 'white',
              color: '#3182ce',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '1rem',
              border: '2px solid #bee3f8',
            }}>
              Ya tengo cuenta
            </Link>
          </div>

          {/* Mini estadísticas */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            marginTop: '2.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid #bee3f8',
          }}>
            <div>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3182ce' }}>500+</p>
              <p style={{ fontSize: '0.8rem', color: '#718096' }}>Negocios activos</p>
            </div>
            <div>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3182ce' }}>50k+</p>
              <p style={{ fontSize: '0.8rem', color: '#718096' }}>Ventas diarias</p>
            </div>
            <div>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3182ce' }}>4.9★</p>
              <p style={{ fontSize: '0.8rem', color: '#718096' }}>Calificación</p>
            </div>
          </div>
        </div>

        {/* Tarjeta de vista previa del POS */}
        <div style={{
          background: 'white',
          borderRadius: '1.5rem',
          padding: '1.5rem',
          boxShadow: '0 20px 50px rgba(49,130,206,0.15)',
          border: '1px solid #bee3f8',
        }}>
          <div style={{
            background: '#2c5282',
            color: 'white',
            padding: '0.75rem 1rem',
            borderRadius: '0.75rem 0.75rem 0 0',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <span>🛒 Punto de Venta</span>
            <span>Hoy</span>
          </div>
          <div style={{ padding: '1rem', background: '#f7fbff', borderRadius: '0 0 0.75rem 0.75rem' }}>
            {/* Mini grid de productos */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
              {['🍔', '🍕', '🥤', '🥗', '🍝', '🍰'].map((emoji, i) => (
                <div key={i} style={{
                  background: 'white',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  textAlign: 'center',
                  fontSize: '1.5rem',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                }}>
                  {emoji}
                </div>
              ))}
            </div>
            <div style={{
              marginTop: '0.75rem',
              padding: '0.75rem',
              background: 'white',
              borderRadius: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}>
              <span style={{ color: '#718096' }}>Total</span>
              <span style={{ color: '#3182ce' }}>$25.52</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN: ¿POR QUÉ ES MEJOR?                   */}
      {/* ============================================ */}
      <section style={{ padding: '5rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1e3a5f', marginBottom: '0.75rem' }}>
              ¿Por qué elegir POS Blue?
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#718096', maxWidth: '600px', margin: '0 auto' }}>
              Todo lo que necesitas para administrar tu negocio, en un solo lugar
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {VENTAJAS.map((v, i) => (
              <div key={i} style={{
                background: '#f7fbff',
                borderRadius: '1rem',
                padding: '1.75rem',
                border: '1px solid #ebf8ff',
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: '#ebf8ff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#3182ce', fontSize: '1.35rem',
                  marginBottom: '1rem',
                }}>
                  {v.icono}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e3a5f', marginBottom: '0.5rem' }}>
                  {v.titulo}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#718096', lineHeight: 1.5 }}>
                  {v.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN: COMPARATIVA                          */}
      {/* ============================================ */}
      <section style={{ padding: '5rem 2rem', background: '#f0f9ff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1e3a5f', marginBottom: '0.75rem' }}>
              POS Blue vs. sistema tradicional
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#718096' }}>
              Mira por qué nuestro sistema es la mejor opción para tu negocio
            </p>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          }}>
            {/* Encabezado de la tabla */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              background: '#102a43',
              color: 'white',
              padding: '1rem 1.5rem',
              fontWeight: 700,
              fontSize: '0.9rem',
            }}>
              <span>Característica</span>
              <span style={{ textAlign: 'center' }}>POS Blue</span>
              <span style={{ textAlign: 'center' }}>Tradicional</span>
            </div>

            {/* Filas */}
            {COMPARATIVA.map((fila, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr',
                padding: '1rem 1.5rem',
                borderBottom: i < COMPARATIVA.length - 1 ? '1px solid #ebf8ff' : 'none',
                background: i % 2 === 0 ? 'white' : '#f7fbff',
                alignItems: 'center',
              }}>
                <span style={{ color: '#1e3a5f', fontWeight: 500, fontSize: '0.9rem' }}>
                  {fila.feature}
                </span>
                <span style={{ textAlign: 'center', color: fila.pos ? '#38a169' : '#e53e3e', fontSize: '1.2rem' }}>
                  {fila.pos ? '✅' : '❌'}
                </span>
                <span style={{ textAlign: 'center', color: fila.tradicional ? '#38a169' : '#e53e3e', fontSize: '1.2rem' }}>
                  {fila.tradicional ? '✅' : '❌'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN: PRECIOS                              */}
      {/* ============================================ */}
      <section style={{ padding: '5rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{
              display: 'inline-block',
              background: '#ebf8ff',
              color: '#2c5282',
              padding: '0.4rem 1rem',
              borderRadius: '2rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '1px',
              marginBottom: '1rem',
            }}>
              PLANES Y PRECIOS
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1e3a5f', marginBottom: '0.75rem' }}>
              Elige el plan perfecto para ti
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#718096' }}>
              Comienza gratis y escala cuando lo necesites. Sin contratos forzosos.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            alignItems: 'stretch',
          }}>
            {PLANES.map(plan => (
              <div key={plan.id} style={{
                background: plan.destacado ? '#2c5282' : 'white',
                color: plan.destacado ? 'white' : '#1e3a5f',
                borderRadius: '1.25rem',
                padding: '2rem',
                border: plan.destacado ? '2px solid #4299e1' : '1px solid #bee3f8',
                boxShadow: plan.destacado
                  ? '0 20px 40px rgba(16,42,67,0.25)'
                  : '0 4px 12px rgba(0,0,0,0.06)',
                transform: plan.destacado ? 'translateY(-10px)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}>
                {plan.destacado && (
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: '#ed8936',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}>
                    <FiStar size={10} /> POPULAR
                  </span>
                )}

                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: plan.destacado ? '#bee3f8' : '#3182ce',
                }}>
                  {plan.titulo}
                </h3>

                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.25rem', marginTop: '0.5rem', color: plan.destacado ? '#bee3f8' : '#3182ce' }}>$</span>
                  <span style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1 }}>{plan.precio}</span>
                </div>
                <p style={{
                  fontSize: '0.85rem',
                  color: plan.destacado ? 'rgba(255,255,255,0.8)' : '#718096',
                  marginBottom: '1.5rem',
                }}>
                  {plan.periodo}
                </p>

                <div style={{
                  height: '1px',
                  background: plan.destacado ? 'rgba(255,255,255,0.15)' : '#ebf8ff',
                  marginBottom: '1.5rem',
                }} />

                <ul style={{ listStyle: 'none', flex: 1, marginBottom: '1.5rem' }}>
                  {plan.caracteristicas.map((c, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      fontSize: '0.9rem',
                      marginBottom: '0.75rem',
                      color: plan.destacado ? 'rgba(255,255,255,0.95)' : '#4a5568',
                    }}>
                      <FiCheck size={14} color={plan.destacado ? '#68d391' : '#38a169'} />
                      {c}
                    </li>
                  ))}
                </ul>

                <Link to="/register" style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.85rem',
                  borderRadius: '0.75rem',
                  background: plan.destacado ? '#4299e1' : '#3182ce',
                  color: 'white',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                }}>
                  {plan.boton}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN: CTA FINAL                            */}
      {/* ============================================ */}
      <section style={{
        padding: '5rem 2rem',
        background: '#2c5282',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            color: 'white',
            marginBottom: '1rem',
          }}>
            ¿Listo para hacer crecer tu negocio?
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#bee3f8',
            marginBottom: '2rem',
          }}>
            Únete a cientos de negocios que ya usan POS Blue. Comienza tu prueba gratis hoy.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={{
              padding: '1rem 2.5rem',
              borderRadius: '0.75rem',
              background: 'white',
              color: '#2c5282',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }}>
              Crear cuenta gratis <FiArrowRight />
            </Link>
            <Link to="/login" style={{
              padding: '1rem 2.5rem',
              borderRadius: '0.75rem',
              background: 'transparent',
              color: 'white',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '1rem',
              border: '2px solid rgba(255,255,255,0.3)',
            }}>
              Iniciar sesión
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER                                        */}
      {/* ============================================ */}
      <footer style={{
        background: '#102a43',
        color: '#a0c4e8',
        padding: '3rem 2rem 2rem',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem',
          }}>
            {/* Columna 1: Logo */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: '#4299e1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem',
                }}>
                  🚀
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>
                  POS Blue
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                El sistema de punto de venta que tu negocio necesita.
              </p>
            </div>

            {/* Columna 2: Producto */}
            <div>
              <h4 style={{ color: 'white', fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Producto</h4>
              <ul style={{ listStyle: 'none', fontSize: '0.85rem', lineHeight: 2 }}>
                <li>Punto de Venta</li>
                <li>Inventario</li>
                <li>Sucursales</li>
                <li>Reportes</li>
              </ul>
            </div>

            {/* Columna 3: Soporte */}
            <div>
              <h4 style={{ color: 'white', fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Soporte</h4>
              <ul style={{ listStyle: 'none', fontSize: '0.85rem', lineHeight: 2 }}>
                <li>Documentación</li>
                <li>Centro de ayuda</li>
                <li>Contacto</li>
              </ul>
            </div>

            {/* Columna 4: Legal */}
            <div>
              <h4 style={{ color: 'white', fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Legal</h4>
              <ul style={{ listStyle: 'none', fontSize: '0.85rem', lineHeight: 2 }}>
                <li>Términos y condiciones</li>
                <li>Política de privacidad</li>
              </ul>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '1.5rem',
            textAlign: 'center',
            fontSize: '0.8rem',
          }}>
            © 2026 POS Blue. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}