import PricingCard from '../components/Subscriptions/PricingCard';

export default function SubscriptionsPage() {
  const plans = [
    {
      title: '7 días gratis',
      price: '50',
      period: 'con un mes de uso',
      features: [
        'Acceso completo',
        'Documentación',
        'Soporte al cliente',
        'Actualizaciones gratis',
        'Dominios ilimitados',
      ],
      buttonLabel: 'Comenzar Prueba',
    },
    {
      title: 'Suscripción 1 Año',
      price: '235',
      period: 'por año',
      features: [
        'Acceso completo',
        'Documentación',
        'Soporte al cliente',
        'Actualizaciones gratis',
        'Dominios ilimitados',
      ],
      highlight: true,
      popular: true,
      buttonLabel: 'Suscribirse Ahora',
    },
    {
      title: 'Suscripción 3 Años',
      price: '450',
      period: 'cada 3 años',
      features: [
        'Acceso completo',
        'Documentación',
        'Soporte al cliente',
        'Actualizaciones gratis',
        'Dominios ilimitados',
      ],
      buttonLabel: 'Mejor Valor',
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '4rem 2rem',
        background:
          'radial-gradient(circle at 20% 0%, #ebf8ff 0%, #d6ecfa 35%, #bee3f8 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Círculos decorativos de fondo */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          right: '-120px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(66,153,225,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-150px',
          left: '-150px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(56,178,172,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Encabezado */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span
            style={{
              display: 'inline-block',
              background: 'white',
              color: 'var(--primary-600)',
              padding: '0.4rem 1rem',
              borderRadius: '2rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              boxShadow: '0 4px 12px rgba(49,130,206,0.15)',
              marginBottom: '1.5rem',
            }}
          >
            Planes y Precios
          </span>

          <h1
            style={{
              fontSize: '3rem',
              fontWeight: 800,
              color: 'var(--primary-800)',
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Elige el plan perfecto{' '}
            <span
              style={{
                background:
                  'linear-gradient(135deg, var(--primary-500), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              para tu negocio
            </span>
          </h1>

          <p
            style={{
              fontSize: '1.1rem',
              color: '#4a5568',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Comienza gratis y escala cuando lo necesites. Sin contratos
            forzosos, cancela cuando quieras.
          </p>
        </div>

        {/* Grid de planes */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch',
            marginBottom: '4rem',
          }}
        >
          {plans.map((plan, i) => (
            <PricingCard key={i} {...plan} />
          ))}
        </div>

        {/* Barra de garantía */}
        <div
          style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1.5rem 2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.06)',
            border: '1px solid var(--primary-100)',
          }}
        >
          {[
            { icon: '🔒', text: 'Pago 100% seguro' },
            { icon: '↩️', text: 'Garantía de 30 días' },
            { icon: '⚡', text: 'Activación inmediata' },
            { icon: '💬', text: 'Soporte 24/7' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.9rem',
                color: 'var(--primary-700)',
                fontWeight: 600,
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>

        {/* Preguntas frecuentes mini */}
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: 'var(--primary-800)',
              marginBottom: '0.75rem',
            }}
          >
            ¿Tienes dudas?
          </h2>
          <p style={{ color: '#718096', marginBottom: '1.5rem' }}>
            Nuestro equipo está listo para ayudarte a elegir el plan ideal.
          </p>
          <button
            className="btn btn-primary"
            style={{
              padding: '0.9rem 2rem',
              borderRadius: '2rem',
              fontSize: '0.95rem',
            }}
          >
            Contactar con Ventas
          </button>
        </div>
      </div>
    </div>
  );
}