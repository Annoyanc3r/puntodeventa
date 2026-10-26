const mongoose = require('mongoose');

const EmpresaSubscripcionSchema = new mongoose.Schema({
  empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true },
  subscripcion: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscripcion', required: true },
  fechaInicio: { type: Date, default: Date.now },
  fechaFin: { type: Date, required: true },
  estado: { type: String, enum: ['activa', 'vencida', 'cancelada'], default: 'activa' },
  pagoReferencia: { type: String }
}, { timestamps: true });


module.exports = mongoose.model('EmpresaSubscripcion', EmpresaSubscripcionSchema);