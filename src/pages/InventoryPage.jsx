import { useState } from 'react';
import { products as initialProducts, categories } from '../data/products';
import { getProductIcon } from '../data/productIcons';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';

export default function InventoryPage() {
  const [items, setItems] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: categories[0] });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setItems(items.map(i => i.id === editing.id ? { ...i, ...form, price: parseFloat(form.price) } : i));
    } else {
      setItems([...items, { ...form, id: Date.now(), price: parseFloat(form.price), image: '' }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setForm({ name: '', description: '', price: '', category: categories[0] });
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, description: item.description || '', price: item.price, category: item.category });
    setEditing(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e3a5f' }}>
            📦 Gestión de Inventario
          </h1>
          <p style={{ color: '#718096', marginTop: '0.25rem' }}>
            {items.length} productos registrados
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => { resetForm(); setShowForm(true); }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiPlus /> Agregar Producto
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div style={{
          background: 'white', borderRadius: '1rem', padding: '1.5rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          borderLeft: '4px solid #3182ce',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ color: '#1e3a5f' }}>
              {editing ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
            </h3>
            <button onClick={resetForm} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a0aec0' }}>
              <FiX size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Nombre</label>
              <input className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label style={labelStyle}>Precio</label>
              <input className="input" type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Descripción</label>
              <input className="input" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Categoría</label>
              <select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
              <button type="submit" className="btn btn-accent" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FiSave /> {editing ? 'Actualizar' : 'Guardar'}
              </button>
              <button type="button" className="btn" onClick={resetForm} style={{ background: '#edf2f7', color: '#4a5568' }}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla */}
      <div style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#102a43', color: 'white' }}>
              <th style={thStyle}>Producto</th>
              <th style={thStyle}>Categoría</th>
              <th style={thStyle}>Descripción</th>
              <th style={thStyle}>Precio</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => {
              const { Icon, color } = getProductIcon(item);

              return (
                <tr key={item.id} style={{ borderBottom: '1px solid #ebf8ff' }}>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '40px', height: '40px',
                        borderRadius: '0.5rem',
                        background: '#ebf8ff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={20} color={color} />
                      </div>
                      <span style={{ fontWeight: 600, color: '#1e3a5f' }}>{item.name}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{
                      background: '#ebf8ff', color: '#2c5282',
                      padding: '0.25rem 0.75rem', borderRadius: '1rem',
                      fontSize: '0.8rem', fontWeight: 600,
                    }}>{item.category}</span>
                  </td>
                  <td style={{ ...tdStyle, color: '#718096', fontSize: '0.9rem' }}>{item.description || '—'}</td>
                  <td style={{ ...tdStyle, fontWeight: 700, color: '#3182ce' }}>${item.price.toFixed(2)}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => handleEdit(item)} style={iconBtn}>
                        <FiEdit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} style={{ ...iconBtn, color: '#e53e3e' }}>
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#2c5282', marginBottom: '0.35rem' };
const thStyle = { padding: '1rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' };
const tdStyle = { padding: '1rem' };
const iconBtn = { background: '#ebf8ff', border: 'none', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer', color: '#3182ce', display: 'flex', alignItems: 'center', justifyContent: 'center' };