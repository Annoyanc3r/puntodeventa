const mongoose = require('mongoose');

const EmpresaUsuarioSchema = new mongoose.Schema({
  empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  rolEnEmpresa: { type: String, default: 'admin' }
}, { timestamps: true });


EmpresaUsuarioSchema.index({ empresa: 1, usuario: 1 }, { unique: true });

module.exports = mongoose.model('EmpresaUsuario', EmpresaUsuarioSchema);