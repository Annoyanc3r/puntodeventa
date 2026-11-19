const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const API = `${BASE_URL}/api/categorias`; // Ajusta a '/api/categoria' si así está montada en server.js

export const obtenerCategorias = async () => {
  const res = await fetch(API);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.msg || 'Error al cargar categorías');
  return Array.isArray(data) ? data : data.categorias || [];
};

export const crearCategoria = async ({ nombre, descripcion = '' }) => {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, descripcion }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.msg || 'Error al crear categoría');
  return data;
};

export const eliminarCategoria = async (id) => {
  const res = await fetch(`${API}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.msg || 'Error al eliminar categoría');
  return data;
};