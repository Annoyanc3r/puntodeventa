const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const API = `${BASE_URL}/api/productos`;

export const obtenerProductos = async () => {
  const res = await fetch(API);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.msg || 'Error al cargar productos');
  return Array.isArray(data) ? data : data.productos || [];
};

export const crearProducto = async ({ categoria, nombre, descripcion = '', precioBase, imagen = '' }) => {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      categoria,
      nombre,
      descripcion,
      precioBase: Number(precioBase),
      imagen,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.msg || 'Error al crear producto');
  return data;
};

export const modificarProducto = async (id, payload) => {
  const res = await fetch(`${API}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.msg || 'Error al actualizar producto');
  return data;
};

export const eliminarProducto = async (id) => {
  const res = await fetch(`${API}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.msg || 'Error al eliminar producto');
  return data;
};