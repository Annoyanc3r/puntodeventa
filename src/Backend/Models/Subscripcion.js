
const mongoose = require('mongoose');

const SubscripcionSchema = new mongoose.Schema({
  nombre: { type: String, required: true }, // Tipo o nombre de subscripcion
  precio: { type: Number, required: true },
  duracionDias: { type: Number, required: true }, 
  caracteristicas: [{ type: String }], //['Acceso total', 'Soporte']
  activo: { type: Boolean, default: true }
}, { timestamps: true });



module.exports = mongoose.model('Subscripcion', SubscripcionSchema);
