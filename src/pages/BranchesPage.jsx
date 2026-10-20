import { useState } from 'react';
import { FiMapPin, FiSave, FiPlus, FiTrash2 } from 'react-icons/fi';

export default function BranchesPage() {
  const [branches, setBranches] = useState([
    { id: 1, nombre: 'Sucursal Centro', num: '001', direccion: 'Av. Principal #123', datos: 'Tel: 555-0101', masDatos: 'Horario: 8am-10pm' },
  ]);
  const [form, setForm] = useState({ nombre: '', num: '', direccion: '', datos: '', masDatos: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setBranches([...branches, { ...form, id: Date.now() }]);
    setForm({ nombre: '', num: '', direccion: '', datos: '', masDatos: '' });
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary-800)' }}>
          🏢 Creación de Sucursal
        </h1>
        <p style={{ color: '#718096', marginTop: '0.25rem' }}>
          Registra una nueva sucursal en el sistema
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{
        background: 'white', borderRadius: '1rem', padding: '2rem',
        boxShadow: 'var(--shadow-lg)',
        borderTop: '4px solid var(--primary-500)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div>
            <label style={labelStyle}>Nombre</label>
            <input className="input" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
          </div>
          <div>
            <label style={labelStyle}>Núm. Sucursales</label>
            <input className="input" value={form.num} onChange={e => setForm({ ...form, num: e.target.value })} required />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Dirección</label>
            <input className="input" value={form.direccion} onChange={e => setForm({ ...form, direccion: e.target.value })} required />
          </div>
          <div>
            <label style={labelStyle}>Datos</label>
            <input className="input" value={form.datos} onChange={e => setForm({ ...form, datos: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Más Datos</label>
            <input className="input" value={form.masDatos} onChange={e => setForm({ ...form, masDatos: e.target.value })} />
          </div>
        </div>
        <button type="submit" className="btn btn-accent" style={{
          marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          <FiSave /> Registrar Sucursal
        </button>
      </form>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <h3 style={{ color: 'var(--primary-800)' }}>Sucursales Registradas</h3>
        {branches.map(b => (
          <div key={b.id} style={{
            background: 'white', borderRadius: '1rem', padding: '1.5rem',
            boxShadow: 'var(--shadow-md)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, var(--primary-400), var(--primary-600))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '1.25rem',
              }}>
                <FiMapPin />
              </div>
              <div>
                <h4 style={{ color: 'var(--primary-800)', fontWeight: 600 }}>{b.nombre}</h4>
                <p style={{ fontSize: '0.85rem', color: '#718096', marginTop: '0.25rem' }}>
                  #{b.num} · {b.direccion}
                </p>
                {b.datos && <p style={{ fontSize: '0.85rem', color: '#718096' }}>{b.datos}</p>}
                {b.masDatos && <p style={{ fontSize: '0.85rem', color: '#718096' }}>{b.masDatos}</p>}
              </div>
            </div>
            <button onClick={() => setBranches(branches.filter(x => x.id !== b.id))}
              style={{ background: 'var(--primary-50)', border: 'none', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer', color: 'var(--danger)' }}>
              <FiTrash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-700)', marginBottom: '0.35rem' };