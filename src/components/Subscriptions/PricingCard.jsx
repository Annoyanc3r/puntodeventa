import { FiCheck } from 'react-icons/fi';

export default function PricingCard({
  title,
  price,
  period,
  features,
  highlight = false,
  popular = false,
  buttonLabel = 'Sign Up',
}) {
  return (
    <div
      style={{
        position: 'relative',
        background: highlight
          ? 'linear-gradient(160deg, var(--primary-700) 0%, var(--primary-800) 100%)'
          : 'white',
        color: highlight ? 'white' : 'var(--text-dark)',
        borderRadius: '1.25rem',
        padding: '2.5rem 2rem',
        boxShadow: highlight
          ? '0 25px 50px -12px rgba(16, 42, 67, 0.45)'
          : '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
        border: highlight
          ? '2px solid var(--primary-400)'
          : '1px solid var(--primary-100)',
        transform: highlight ? 'translateY(-12px) scale(1.03)' : 'none',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        if (!highlight) {
          e.currentTarget.style.transform = 'translateY(-6px)';
          e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(49, 130, 206, 0.25)';
          e.currentTarget.style.borderColor = 'var(--primary-300)';
        }
      }}
      onMouseLeave={(e) => {
        if (!highlight) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.08)';
          e.currentTarget.style.borderColor = 'var(--primary-100)';
        }
      }}
    >
      {/* Badge Popular */}
      {popular && (
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '-2.5rem',
            background: 'var(--accent)',
            color: 'white',
            padding: '0.35rem 3rem',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '1px',
            transform: 'rotate(45deg)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}
        >
          POPULAR
        </div>
      )}

      {/* Encabezado */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: highlight ? 'var(--primary-300)' : 'var(--primary-600)',
            marginBottom: '1rem',
          }}
        >
          {title}
        </h3>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '0.25rem',
          }}
        >
          <span
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              marginTop: '0.5rem',
              color: highlight ? 'var(--primary-300)' : 'var(--primary-500)',
            }}
          >
            $
          </span>
          <span
            style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-2px',
              color: highlight ? 'white' : 'var(--primary-800)',
            }}
          >
            {price}
          </span>
        </div>
        {period && (
          <p
            style={{
              fontSize: '0.85rem',
              marginTop: '0.5rem',
              color: highlight ? 'var(--primary-300)' : '#718096',
              fontWeight: 500,
            }}
          >
            {period}
          </p>
        )}
      </div>

      {/* Divisor */}
      <div
        style={{
          height: '1px',
          background: highlight
            ? 'rgba(255,255,255,0.15)'
            : 'var(--primary-100)',
          marginBottom: '1.5rem',
        }}
      />

      {/* Lista de features */}
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
          flex: 1,
          marginBottom: '2rem',
        }}
      >
        {features.map((feature, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.9rem',
              color: highlight ? 'rgba(255,255,255,0.9)' : '#4a5568',
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: highlight
                  ? 'rgba(56, 178, 172, 0.25)'
                  : 'var(--primary-50)',
                color: highlight ? 'var(--accent)' : 'var(--primary-500)',
                flexShrink: 0,
              }}
            >
              <FiCheck size={13} strokeWidth={3} />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      {/* Botón */}
      <button
        className={highlight ? 'btn btn-accent' : 'btn btn-primary'}
        style={{
          width: '100%',
          padding: '1rem',
          borderRadius: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.5px',
          fontSize: '0.95rem',
          transition: 'all 0.2s ease',
        }}
      >
        {buttonLabel}
      </button>
    </div>
  );
}