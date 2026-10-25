const mongoose = require('mongoose');

const SucursalSchema = new mongoose.Schema({
  id_empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa' },
  nombre: { type: String, required: true },
  num_sucursal: String,
  direccion: String,
  zipCode: String,
  activa: { type: Boolean, default: true },
  
  // preferencias del pos
  configuracion_pos: {
    color_primario: { type: String, default: '#3182ce' },
    estilo_caja: { type: String, default: 'moderno' },
    formato_ticket: { type: String, default: 'estandar' }
  },
  menu_pos: [{
    id_producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    visible: { type: Boolean, default: true },
    orden: { type: Number }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Sucursal', SucursalSchema);