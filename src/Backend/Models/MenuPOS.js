const mongoose = require('mongoose');

const MenuPOSSchema = new mongoose.Schema({
  sucursal: { type: mongoose.Schema.Types.ObjectId, ref: 'Sucursal', required: true },
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  visible: { type: Boolean, default: true },
  orden: { type: Number, default: 0 } 
}, { timestamps: true });


module.exports = mongoose.model('MenuPOS', MenuPOSSchema);

