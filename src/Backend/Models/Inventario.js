
const mongoose = require('mongoose');


const InventarioSchema = new mongoose.Schema({
  sucursal: { type: mongoose.Schema.Types.ObjectId, ref: 'Sucursal', required: true },
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  stock: { type: Number, required: true, default: 0 },
  stockMinimo: { type: Number, default: 5 },
  precioVenta: { type: Number, required: true } 
}, { timestamps: true });

InventarioSchema.index({ sucursal: 1, producto: 1 }, { unique: true });


module.exports = mongoose.model('Inventario', InventarioSchema);
