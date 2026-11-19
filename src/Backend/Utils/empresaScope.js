const jwt = require('jsonwebtoken');
const EmpresaUsuario = require('../Models/EmpresaUsuario');
const Sucursal = require('../Models/Sucursal');

async function obtenerContextoUsuario(req) {
  let usuarioId =
    req.headers['x-user-id'] ||
    req.query?.usuarioId ||
    req.body?.usuarioId ||
    null;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      if (process.env.JWT_SECRET) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        usuarioId = decoded.id || decoded._id || decoded.usuarioId || usuarioId;
      } else {
        const payloadBase64 = token.split('.')[1];
        if (payloadBase64) {
          const parsed = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf8'));
          usuarioId = parsed.id || parsed._id || parsed.usuarioId || usuarioId;
        }
      }
    } catch {
      // Continúa con usuarioId si viene en query/body/header
    }
  }

  if (!usuarioId) {
    return { usuarioId: null, empresaId: null, sucursalIds: [] };
  }

  const relacion = await EmpresaUsuario.findOne({ usuario: usuarioId }).lean();
  const empresaId = relacion ? relacion.empresa : null;

  let sucursalIds = [];
  if (empresaId) {
    const sucursales = await Sucursal.find({ empresa: empresaId }).select('_id').lean();
    sucursalIds = sucursales.map((s) => s._id);
  }

  return { usuarioId, empresaId, sucursalIds };
}

module.exports = { obtenerContextoUsuario };