import { useState, useEffect } from 'react';
import { FiMapPin, FiSave, FiTrash2 } from 'react-icons/fi';
import { crearSucursal, obtenerSucursales, darBajaSucursal } from '../services/sucursalService';

// Helper local: obtiene el ID del usuario logueado
const getUsuarioId = () => {
  const raw = sessionStorage.getItem('usuario');
  if (!raw) return null;
  try {
    const usuario = JSON.parse(raw);
    return usuario?._id || null;
  } catch {
    return null;
  }
};

export default function BranchesPage() {
  const [branches, setBranches] = useState([]);
  const [form, setForm] = useState({ nombre: '', num: '', direccion: '', datos: '', masDatos: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);

  // --- Cargar sucursales al montar ---
  useEffect(() => {
    const cargar = async () => {
      const ID_usuario = getUsuarioId();
      
      if (!ID_usuario) {
        setError('No hay sesión activa. Inicia sesión nuevamente.');
        setLoadingList(false);
        return;
      }
      try {
        const data = await obtenerSucursales(ID_usuario);
        const mapeadas = (data.sucursales || []).map((s) => ({
          id: s._id,
          nombre: s.nombre,
          direccion: s.direccion || '',
          datos: s.telefono ? `Tel: ${s.telefono}` : '',
        }));
        setBranches(mapeadas);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingList(false);
      }
    };
    cargar();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const ID_usuario = getUsuarioId();
      const data = await crearSucursal({ ID_usuario, ...form });

      setBranches((prev) => [
        {
          id: data.sucursal._id,
          nombre: data.sucursal.nombre,
          direccion: data.sucursal.direccion || '',
          datos: data.sucursal.telefono ? `Tel: ${data.sucursal.telefono}` : '',
        },
        ...prev,
      ]);

      setForm({ nombre: '', num: '', direccion: '', datos: '', masDatos: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 const handleDelete = async (id) => {
    setError('');
    try {
      const ID_usuario = getUsuarioId();
      await darBajaSucursal(id, ID_usuario);
      setBranches((prev) => prev.filter((x) => x.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e3a5f' }}>
          🏢 Creación de Sucursal
        </h1>
        <p style={{ color: '#718096', marginTop: '0.25rem' }}>
          Registra una nueva sucursal en el sistema
        </p>
      </div>

      {error && (
        <div style={{
          background: '#fff5f5', border: '1px solid #feb2b2', color: '#c53030',
          padding: '0.75rem 1rem', borderRadius: '0.5rem', fontSize: '0.9rem',
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        background: 'white', borderRadius: '1rem', padding: '2rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
        borderTop: '4px solid #3182ce',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div>
            <label style={labelStyle}>Nombre</label>
            <input className="input" value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
          </div>
          <div>
            <label style={labelStyle}>Núm. Sucursales</label>
            <input className="input" value={form.num}
              onChange={(e) => setForm({ ...form, num: e.target.value })} required />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Dirección</label>
            <input className="input" value={form.direccion}
              onChange={(e) => setForm({ ...form, direccion: e.target.value })} required />
          </div>
          <div>
            <label style={labelStyle}>Datos</label>
            <input className="input" value={form.datos}
              onChange={(e) => setForm({ ...form, datos: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Más Datos</label>
            <input className="input" value={form.masDatos}
              onChange={(e) => setForm({ ...form, masDatos: e.target.value })} />
          </div>
        </div>
        <button type="submit" className="btn btn-accent" disabled={loading} style={{
          marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
          opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer',
        }}>
          <FiSave /> {loading ? 'Registrando...' : 'Registrar Sucursal'}
        </button>
      </form>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <h3 style={{ color: '#1e3a5f' }}>Sucursales Registradas</h3>

        {loadingList && <p style={{ color: '#718096', fontSize: '0.9rem' }}>Cargando sucursales...</p>}

        {!loadingList && branches.map((b) => (
          <div key={b.id} style={{
            background: 'white', borderRadius: '1rem', padding: '1.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '0.75rem',
                background: '#4299e1', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: 'white', fontSize: '1.25rem',
              }}>
                <FiMapPin />
              </div>
              <div>
                <h4 style={{ color: '#1e3a5f', fontWeight: 600 }}>{b.nombre}</h4>
                {b.direccion && (
                  <p style={{ fontSize: '0.85rem', color: '#718096', marginTop: '0.25rem' }}>
                    {b.direccion}
                  </p>
                )}
                {b.datos && <p style={{ fontSize: '0.85rem', color: '#718096' }}>{b.datos}</p>}
              </div>
            </div>
            <button onClick={() => handleDelete(b.id)} style={{
              background: '#ebf8ff', border: 'none', padding: '0.5rem',
              borderRadius: '0.5rem', cursor: 'pointer', color: '#e53e3e',
            }}>
              <FiTrash2 size={14} />
            </button>
          </div>
        ))}

        {!loadingList && branches.length === 0 && (
          <p style={{ color: '#718096', fontSize: '0.9rem' }}>No hay sucursales registradas.</p>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block', fontSize: '0.85rem', fontWeight: 600,
  color: '#2c5282', marginBottom: '0.35rem',
};