
const mongoose = require('mongoose');

const SucursalSchema = new mongoose.Schema({
  empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true },
  nombre: { type: String, required: true },
  direccion: { type: String },
  codigoPostal: { type: String },
  telefono: { type: String },
  activo: { type: Boolean, default: true }
}, { timestamps: true });



module.exports = mongoose.model('Sucursal', SucursalSchema);