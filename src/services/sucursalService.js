// src/Frontend/services/sucursalService.js
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const API = `${BASE_URL}/api/sucursal/`;
const API_USUARIO = `${API}Sucursal_Usuario/`;

/**
 * Crea una sucursal para la empresa del usuario autenticado.
 * El backend resuelve la empresa vía EmpresaUsuario a partir del ID_usuario.
 *
 * @param {Object} payload
 * @param {string} payload.ID_usuario  - ID del usuario (sessionStorage.user_ID)
 * @param {string} payload.nombre      - Nombre de la sucursal (requerido)
 * @param {string} [payload.num]       - Número de sucursal (se pliega al nombre)
 * @param {string} [payload.direccion]
 * @param {string} [payload.datos]     - Teléfono, se limpia el prefijo "Tel:"
 * @param {string} [payload.masDatos]  - Se pliega a la dirección
 * @returns {Promise<{ msg: string, sucursal: Object, empresaId: string }>}
 */
export const crearSucursal = async ({ ID_usuario, nombre, num, direccion, datos, masDatos }) => {
  if (!ID_usuario) {
    throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
  }
  if (!nombre || !nombre.trim()) {
    throw new Error('El nombre de la sucursal es requerido.');
  }

  const res = await fetch(API_USUARIO, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ID_usuario, nombre, num, direccion, datos, masDatos }),
  });

  const data = await res.json();

  if (!res.ok) {
    // Normalizamos errores como en register()
    const mensaje =
      data.msg ||
      data.error ||
      (data.errors && Object.values(data.errors)[0]?.message) ||
      'Error al crear la sucursal';
    throw new Error(mensaje);
  }

  return data;
};


export const obtenerSucursales = async (ID_usuario) => {
  if (!ID_usuario) {
    throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
  }

  const res = await fetch(`${API_USUARIO}${encodeURIComponent(ID_usuario)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();

  if (!res.ok) {
    const mensaje =
      data.msg ||
      data.error ||
      (data.errors && Object.values(data.errors)[0]?.message) ||
      'Error al obtener las sucursales';
    throw new Error(mensaje);
  }

  return data;
};