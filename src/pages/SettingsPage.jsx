import { useState } from 'react';
import { FiSave, FiDroplet, FiLayout, FiType } from 'react-icons/fi';

export default function SettingsPage() {
  const [primary, setPrimary] = useState('#3182ce');
  const [style, setStyle] = useState('moderno');
  const [format, setFormat] = useState('estandar');

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary-800)' }}>
          ⚙️ Ajustes del Sistema
        </h1>
        <p style={{ color: '#718096', marginTop: '0.25rem' }}>
          Personaliza la apariencia y configuración de tu punto de venta
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>

        <Card icon={<FiDroplet />} title="Cambio de Colores" subtitle="Personaliza la paleta">
          <label style={labelStyle}>Color principal</label>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input type="color" value={primary} onChange={e => setPrimary(e.target.value)}
              style={{ width: '50px', height: '40px', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }} />
            <input className="input" value={primary} onChange={e => setPrimary(e.target.value)} />
          </div>
        </Card>

        <Card icon={<FiLayout />} title="Estilo de Caja" subtitle="Elige el diseño">
          <select className="input" value={style} onChange={e => setStyle(e.target.value)}>
            <option value="moderno">Moderno</option>
            <option value="clasico">Clásico</option>
            <option value="minimalista">Minimalista</option>
          </select>
        </Card>

        <Card icon={<FiType />} title="Cambio de Formato" subtitle="Formato de tickets">
          <select className="input" value={format} onChange={e => setFormat(e.target.value)}>
            <option value="estandar">Estándar</option>
            <option value="compacto">Compacto</option>
            <option value="detallado">Detallado</option>
          </select>
        </Card>
      </div>

      <button className="btn btn-accent" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <FiSave /> Guardar Cambios
      </button>
    </div>
  );
}

function Card({ icon, title, subtitle, children }) {
  return (
    <div style={{
      background: 'white', borderRadius: '1rem', padding: '1.5rem',
      boxShadow: 'var(--shadow-md)',
    }}>
      <div style={{
        width: '42px', height: '42px', borderRadius: '0.75rem',
        background: 'linear-gradient(135deg, var(--primary-100), var(--primary-300))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--primary-700)', fontSize: '1.25rem', marginBottom: '1rem',
      }}>
        {icon}
      </div>
      <h3 style={{ color: 'var(--primary-800)', fontWeight: 600, marginBottom: '0.25rem' }}>{title}</h3>
      <p style={{ fontSize: '0.85rem', color: '#718096', marginBottom: '1rem' }}>{subtitle}</p>
      {children}
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-700)', marginBottom: '0.35rem' };