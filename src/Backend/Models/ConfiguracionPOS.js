
const mongoose = require('mongoose');

const ConfiguracionPOSSchema = new  mongoose.Schema({
  sucursal: { type:  mongoose.Schema.Types.ObjectId, ref: 'Sucursal', required: true, unique: true },
  colores: {
    primario: { type: String, default: '#FF0000' },
    secundario: { type: String, default: '#FFFFFF' }
  },
  formatoTicket: { type: String, default: '80mm' },
  mostrarPropinas: { type: Boolean, default: false }
}, { timestamps: true });


module.exports = mongoose.model('ConfiguracionPos', ConfiguracionPOSSchema);