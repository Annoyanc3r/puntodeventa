const mongoose = require('mongoose');


const ProductoSchema = new  mongoose.Schema({
  categoria: { type:  mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precioBase: { type: Number, required: true },
  imagen: { type: String }, // URL
  activo: { type: Boolean, default: true }
}, { timestamps: true });



module.exports = mongoose.model('Producto', ProductoSchema);
