const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
  empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa' },
  nombre: { type: String, required: true },
  descripcion: { type: String },
  activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Categoria', CategoriaSchema);