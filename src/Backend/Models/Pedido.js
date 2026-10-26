
const mongoose = require('mongoose');

const PedidoSchema = new  mongoose.Schema({
  sucursal: { type:  mongoose.Schema.Types.ObjectId, ref: 'Sucursal', required: true },
  cliente: { type:  mongoose.Schema.Types.ObjectId, ref: 'Cliente' }, //Si el pedido fue hecho en el mostrador para guardar el id del cliente que realizo la compra
  empleado: { type:  mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
  estado: { type: String, enum: ['pendiente', 'en_cocina', 'listo', 'pagado', 'cancelado'], default: 'pendiente' },
  total: { type: Number, required: true },
  //Detalles del pedido
  detalles: [{
    producto: { type:  mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    nombreProducto: { type: String },
    cantidad: { type: Number, required: true },
    precioUnitario: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    notas: { type: String } // Ej: "Sin cebolla"
  }],
  // Pagos
  pagos: [{
    metodo: { type: String, enum: ['efectivo', 'tarjeta', 'transferencia'], required: true },
    monto: { type: Number, required: true },
    referencia: { type: String }, 
    fechaPago: { type: Date, default: Date.now }
  }]
}, { timestamps: true });


module.exports = mongoose.model('Pedido', PedidoSchema);


