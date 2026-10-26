const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
  sucursal: { type: mongoose.Schema.Types.ObjectId, ref: 'Sucursal', required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }, 
  nombre: { type: String, required: true },
  puesto: { type: String },
  activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Sucursal', EmpleadoSchema);