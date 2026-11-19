import { useState, useEffect } from 'react';
import { products as initialProducts, categories as fallbackCategories } from '../data/products';
import { getProductIcon } from '../data/productIcons';
import { obtenerCategorias, crearCategoria, eliminarCategoria } from '../services/categoriaService';
import {
  obtenerProductos,
  crearProducto,
  modificarProducto,
  eliminarProducto,
} from '../services/productoService';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiTag, FiDownload } from 'react-icons/fi';

const normalizarProducto = (p) => ({
  id: p._id || p.id,
  name: p.nombre || p.name,
  description: p.descripcion || p.description || '',
  price: Number(p.precioBase ?? p.price ?? 0),
  category:
    typeof p.categoria === 'object' && p.categoria !== null
      ? p.categoria.nombre
      : p.categoria || p.category || '',
  categoriaId:
    typeof p.categoria === 'object' && p.categoria !== null
      ? p.categoria._id
      : p.categoriaId || null,
  image: p.imagen || p.image || '',
  isLocal: Boolean(p.isLocal),
});

export default function InventoryPage() {
  const [items, setItems] = useState(
    initialProducts.map((p) => ({ ...p, isLocal: true }))
  );
  const [categoryList, setCategoryList] = useState(
    fallbackCategories.map((name, idx) => ({ _id: `local-${idx}`, nombre: name }))
  );
  const [newCategoryName, setNewCategoryName] = useState('');
  const [catLoading, setCatLoading] = useState(false);
  const [catMessage, setCatMessage] = useState('');
  const [prodError, setProdError] = useState('');
  const [vendidosPorProducto, setVendidosPorProducto] = useState({});

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: fallbackCategories[0] || '',
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const cats = await obtenerCategorias();
        if (cats.length > 0) {
          setCategoryList(cats);
          setForm((prev) => ({
            ...prev,
            category: prev.category || cats[0].nombre,
          }));
        }
      } catch {
        // Mantiene categorías de respaldo si falla o aún no hay
      }

      try {
        const prods = await obtenerProductos();
        if (prods.length > 0) {
          setItems(prods.map(normalizarProducto));
        }
      } catch {
        // Mantiene productos locales de respaldo si aún no hay en BD
      }

      try {
        const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:4000';
        const resPedidos = await fetch(`${apiBase}/api/pedidos`);
        if (resPedidos.ok) {
          const pedidosData = await resPedidos.json();
          const acumulador = {};
          (Array.isArray(pedidosData) ? pedidosData : []).forEach((pedido) => {
            if (pedido.estado === 'cancelado') return;
            (pedido.detalles || []).forEach((det) => {
              const cant = Number(det.cantidad || 0);
              const prodId = typeof det.producto === 'object' ? det.producto?._id : det.producto;
              if (prodId) {
                acumulador[String(prodId)] = (acumulador[String(prodId)] || 0) + cant;
              }
              if (det.nombreProducto) {
                const keyNombre = `nombre:${String(det.nombreProducto).trim().toLowerCase()}`;
                acumulador[keyNombre] = (acumulador[keyNombre] || 0) + cant;
              }
            });
          });
          setVendidosPorProducto(acumulador);
        }
      } catch {
        // Si no hay pedidos aún, queda en 0
      }
    };
    cargarDatos();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const nombreLimpio = newCategoryName.trim();
    if (!nombreLimpio) return;

    setCatMessage('');
    setCatLoading(true);
    try {
      const creada = await crearCategoria({ nombre: nombreLimpio });
      const nuevaCat = creada._id ? creada : { _id: Date.now().toString(), nombre: nombreLimpio };
      setCategoryList((prev) => [...prev, nuevaCat]);
      setForm((prev) => ({ ...prev, category: nuevaCat.nombre }));
      setNewCategoryName('');
      setCatMessage('Categoría agregada.');
    } catch (err) {
      setCatMessage(err.message);
    } finally {
      setCatLoading(false);
    }
  };

  const handleDeleteCategory = async (cat) => {
    setCatMessage('');
    if (!window.confirm(`¿Eliminar la categoría "${cat.nombre}"?`)) return;

    try {
      if (cat._id && !String(cat._id).startsWith('local-')) {
        await eliminarCategoria(cat._id);
      }
      const restantes = categoryList.filter((c) => (c._id || c.nombre) !== (cat._id || cat.nombre));
      setCategoryList(restantes);
      if (form.category === cat.nombre) {
        setForm((prev) => ({ ...prev, category: restantes[0]?.nombre || '' }));
      }
      setCatMessage('Categoría eliminada.');
    } catch (err) {
      setCatMessage(err.message);
    }
  };

  const resolverCategoriaId = (nombreCategoria) => {
    const encontrada = categoryList.find((c) => c.nombre === nombreCategoria);
    if (encontrada && encontrada._id && !String(encontrada._id).startsWith('local-')) {
      return encontrada._id;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProdError('');

    let categoriaId = resolverCategoriaId(form.category);

    // Si eligió una categoría local que aún no existe en Mongo, la creamos primero para tener su ObjectId
    if (!categoriaId && form.category) {
      try {
        const creada = await crearCategoria({ nombre: form.category });
        if (creada?._id) {
          categoriaId = creada._id;
          setCategoryList((prev) => [...prev, creada]);
        }
      } catch {
        // Si ya existía o falla, se manejará en la validación del backend
      }
    }

    if (!categoriaId) {
      setProdError('Selecciona o crea una categoría válida guardada en la base de datos.');
      return;
    }

    const payload = {
      nombre: form.name.trim(),
      descripcion: form.description.trim(),
      precioBase: parseFloat(form.price),
      categoria: categoriaId,
    };

    try {
      if (editing && editing.id && !editing.isLocal) {
        const actualizada = await modificarProducto(editing.id, payload);
        const norm = normalizarProducto({
          ...actualizada,
          categoria: actualizada.categoria?.nombre ? actualizada.categoria : { _id: categoriaId, nombre: form.category },
        });
        setItems((prev) => prev.map((i) => (i.id === editing.id ? norm : i)));
      } else {
        const creado = await crearProducto(payload);
        const norm = normalizarProducto({
          ...creado,
          categoria: { _id: categoriaId, nombre: form.category },
        });
        if (editing?.isLocal) {
          setItems((prev) => prev.map((i) => (i.id === editing.id ? norm : i)));
        } else {
          setItems((prev) => [norm, ...prev]);
        }
      }
      resetForm();
    } catch (err) {
      setProdError(err.message);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      description: '',
      price: '',
      category: categoryList[0]?.nombre || '',
    });
    setEditing(null);
    setShowForm(false);
    setProdError('');
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      description: item.description || '',
      price: item.price,
      category: item.category,
    });
    setEditing(item);
    setShowForm(true);
  };

  const handleDelete = async (item) => {
    setProdError('');
    if (!window.confirm('¿Eliminar este producto?')) return;

    try {
      if (item.id && !item.isLocal) {
        await eliminarProducto(item.id);
      }
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err) {
      setProdError(err.message);
    }
  };

  const exportarInventarioExcel = () => {
    const fechaReporte = new Date().toLocaleString();
    const totalProductos = items.length;
    let totalVendidos = 0;
    let totalIngresos = 0;

    const filas = items
      .map((item) => {
        const vendidos =
          vendidosPorProducto[String(item.id)] ??
          vendidosPorProducto[`nombre:${String(item.name || '').trim().toLowerCase()}`] ??
          0;
        const precio = Number(item.price || 0);
        const ingresoItem = precio * Number(vendidos);

        totalVendidos += Number(vendidos);
        totalIngresos += ingresoItem;

        return `
          <tr>
            <td>${String(item.name || '').replace(/</g, '<')}</td>
            <td>${String(item.category || '').replace(/</g, '<')}</td>
            <td>${String(item.description || '—').replace(/</g, '<')}</td>
            <td style="mso-number-format:'$#,##0.00';">$${precio.toFixed(2)}</td>
            <td style="text-align:center;">${vendidos}</td>
            <td style="mso-number-format:'$#,##0.00';">$${ingresoItem.toFixed(2)}</td>
          </tr>
        `;
      })
      .join('');

    const contenidoExcel = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:x="urn:schemas-microsoft-com:office:excel"
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="UTF-8" />
      </head>
      <body>
        <table border="1" style="border-collapse: collapse; font-family: Arial, sans-serif;">
          <tr>
            <th colspan="6" style="background:#102a43; color:#ffffff; font-size:16px; padding:10px;">
              REPORTE DE INVENTARIO Y VENTAS - POS BLUE (${fechaReporte})
            </th>
          </tr>
          <tr style="background:#2c5282; color:#ffffff; font-weight:bold;">
            <th>Producto</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Precio Unitario</th>
            <th>Unidades Vendidas</th>
            <th>Ingresos por Ventas</th>
          </tr>
          ${filas}
          <tr style="background:#ebf8ff; font-weight:bold;">
            <td colspan="3">TOTALES (${totalProductos} productos)</td>
            <td>—</td>
            <td style="text-align:center;">${totalVendidos}</td>
            <td style="mso-number-format:'$#,##0.00';">$${totalIngresos.toFixed(2)}</td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', contenidoExcel], {
      type: 'application/vnd.ms-excel;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = `Reporte_Inventario_${new Date().toISOString().slice(0, 10)}.xls`;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
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
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            type="button"
            className="btn btn-accent"
            onClick={exportarInventarioExcel}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <FiDownload /> Exportar Excel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <FiPlus /> Agregar Producto
          </button>
        </div>
      </div>

      {/* Alta y baja de Categorías */}
      <div
        style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '1.25rem 1.5rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          borderLeft: '4px solid #2b6cb0',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <h3 style={{ color: '#1e3a5f', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
            <FiTag /> Categorías
          </h3>

          <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              className="input"
              placeholder="Nueva categoría..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              style={{ minWidth: '200px' }}
            />
            <button type="submit" className="btn btn-accent" disabled={catLoading} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <FiPlus /> {catLoading ? 'Guardando...' : 'Agregar'}
            </button>
          </form>
        </div>

        {catMessage && (
          <p style={{ fontSize: '0.85rem', color: '#2c5282', margin: 0 }}>{catMessage}</p>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {categoryList.map((cat) => (
            <span
              key={cat._id || cat.nombre}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: '#ebf8ff',
                color: '#2c5282',
                padding: '0.35rem 0.7rem',
                borderRadius: '1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              {cat.nombre}
              <button
                type="button"
                onClick={() => handleDeleteCategory(cat)}
                title="Eliminar categoría"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#e53e3e',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FiTrash2 size={13} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {prodError && (
        <div
          style={{
            background: '#fff5f5',
            border: '1px solid #feb2b2',
            color: '#c53030',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            fontSize: '0.9rem',
          }}
        >
          {prodError}
        </div>
      )}

      {/* Formulario de Producto */}
      {showForm && (
        <div
          style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            borderLeft: '4px solid #3182ce',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ color: '#1e3a5f' }}>
              {editing ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
            </h3>
            <button type="button" onClick={resetForm} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a0aec0' }}>
              <FiX size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Nombre</label>
              <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label style={labelStyle}>Precio</label>
              <input className="input" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Descripción</label>
              <input className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Categoría</label>
              <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {categoryList.map((c) => (
                  <option key={c._id || c.nombre} value={c.nombre}>
                    {c.nombre}
                  </option>
                ))}
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
              <th style={thStyle}>Vendidos</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const { Icon, color } = getProductIcon({ name: item.name, category: item.category });
              const vendidos =
                vendidosPorProducto[String(item.id)] ??
                vendidosPorProducto[`nombre:${String(item.name || '').trim().toLowerCase()}`] ??
                0;

              return (
                <tr key={item.id} style={{ borderBottom: '1px solid #ebf8ff' }}>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '0.5rem',
                          background: '#ebf8ff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon size={20} color={color} />
                      </div>
                      <span style={{ fontWeight: 600, color: '#1e3a5f' }}>{item.name}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        background: '#ebf8ff',
                        color: '#2c5282',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                      }}
                    >
                      {item.category}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, color: '#718096', fontSize: '0.9rem' }}>{item.description || '—'}</td>
                  <td style={{ ...tdStyle, fontWeight: 700, color: '#3182ce' }}>${Number(item.price).toFixed(2)}</td>
                  <td style={{ ...tdStyle, fontWeight: 700, color: '#2b6cb0' }}>{vendidos}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button type="button" onClick={() => handleEdit(item)} style={iconBtn}>
                        <FiEdit2 size={14} />
                      </button>
                      <button type="button" onClick={() => handleDelete(item)} style={{ ...iconBtn, color: '#e53e3e' }}>
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