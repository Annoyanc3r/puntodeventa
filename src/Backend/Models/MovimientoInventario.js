const mongoose = require('mongoose');

const MovimientoInventarioSchema = new mongoose.Schema({
  inventario: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventario', required: true },
  empleado: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
  tipo: { type: String, enum: ['entrada', 'salida', 'ajuste'], required: true },
  cantidad: { type: Number, required: true },
  motivo: { type: String }, 
}, { timestamps: true });



module.exports = mongoose.model('MovimientoInventario', MovimientoInventarioSchema);