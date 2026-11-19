const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const API = `${BASE_URL}/api/productos`;

const obtenerUsuarioIdSesion = () => {
  try {
    const usuarioObj = JSON.parse(sessionStorage.getItem('usuario') || 'null');
    return usuarioObj?._id || usuarioObj?.id || sessionStorage.getItem('user_ID') || null;
  } catch {
    return sessionStorage.getItem('user_ID') || null;
  }
};

const construirHeaders = (extra = {}) => {
  const token = sessionStorage.getItem('token');
  const usuarioId = obtenerUsuarioIdSesion();
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(usuarioId ? { 'x-user-id': usuarioId } : {}),
    ...extra,
  };
};

const construirUrlConUsuario = (baseUrl, usuarioIdParam) => {
  const usuarioId = usuarioIdParam || obtenerUsuarioIdSesion();
  if (!usuarioId) return baseUrl;
  const sep = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${sep}usuarioId=${encodeURIComponent(usuarioId)}`;
};

export const obtenerProductos = async (usuarioId = null) => {
  const url = construirUrlConUsuario(API, usuarioId);
  const res = await fetch(url, {
    headers: construirHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.msg || 'Error al cargar productos');
  return Array.isArray(data) ? data : data.productos || [];
};

export const crearProducto = async ({
  categoria,
  nombre,
  descripcion = '',
  precioBase,
  imagen = '',
  usuarioId = null,
}) => {
  const uid = usuarioId || obtenerUsuarioIdSesion();
  const res = await fetch(construirUrlConUsuario(API, uid), {
    method: 'POST',
    headers: construirHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      categoria,
      nombre,
      descripcion,
      precioBase: Number(precioBase),
      imagen,
      ...(uid ? { usuarioId: uid } : {}),
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.msg || 'Error al crear producto');
  return data;
};

export const modificarProducto = async (id, payload, usuarioId = null) => {
  const uid = usuarioId || obtenerUsuarioIdSesion();
  const url = construirUrlConUsuario(`${API}/${encodeURIComponent(id)}`, uid);
  const res = await fetch(url, {
    method: 'PUT',
    headers: construirHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      ...payload,
      ...(uid ? { usuarioId: uid } : {}),
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.msg || 'Error al actualizar producto');
  return data;
};

export const eliminarProducto = async (id, usuarioId = null) => {
  const url = construirUrlConUsuario(`${API}/${encodeURIComponent(id)}`, usuarioId);
  const res = await fetch(url, {
    method: 'DELETE',
    headers: construirHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.msg || 'Error al eliminar producto');
  return data;
};