const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const API = `${BASE_URL}/api/usuario`;

export const login = async (email, password) => {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || data.error || 'Error al iniciar sesión');
  return data;
};

export const register = async ({ nombre, email, password }) => {
  // Solo enviamos los campos permitidos; nunca 'rol' ni '_id' desde el cliente
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    // Mongo devuelve errores con distinta forma; normalizamos
    const mensaje =
      data.msg ||
      data.error ||
      (data.errors && Object.values(data.errors)[0]?.message) ||
      'Error al registrar usuario';
    throw new Error(mensaje);
  }
  return data;
};

export const verificarSubscripcion = async (email) => {
  console.log("asdasd");
  const res = await fetch(`${API}/${encodeURIComponent(email)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || data.error || 'Error al verificar suscripción');
  return data; // { activa: boolean, subscripcion: obj|null }
};