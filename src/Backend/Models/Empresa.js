const mongoose = require('mongoose');

const EmpresaSchema =  new mongoose.Schema({
  nombre: { type: String, required: true },
  rfc: { type: String }, 
  activo: { type: Boolean, default: true }
}, { timestamps: true });


module.exports = mongoose.model('Empresa', EmpresaSchema);