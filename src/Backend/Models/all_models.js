const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
  sucursal: { type: mongoose.Schema.Types.ObjectId, ref: 'Sucursal', required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }, 
  nombre: { type: String, required: true },
  puesto: { type: String },
  activo: { type: Boolean, default: true }
}, { timestamps: true });


const ClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String },
  telefono: { type: String },
  direccion: { type: String }
}, { timestamps: true });


const CategoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  activo: { type: Boolean, default: true }
}, { timestamps: true });


const ProductoSchema = new  mongoose.Schema({
  categoria: { type:  mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precioBase: { type: Number, required: true },
  imagen: { type: String }, // URL
  activo: { type: Boolean, default: true }
}, { timestamps: true });


const InventarioSchema = new mongoose.Schema({
  sucursal: { type: mongoose.Schema.Types.ObjectId, ref: 'Sucursal', required: true },
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  stock: { type: Number, required: true, default: 0 },
  stockMinimo: { type: Number, default: 5 },
  precioVenta: { type: Number, required: true } 
}, { timestamps: true });

InventarioSchema.index({ sucursal: 1, producto: 1 }, { unique: true });

const MovimientoInventarioSchema = new mongoose.Schema({
  inventario: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventario', required: true },
  empleado: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
  tipo: { type: String, enum: ['entrada', 'salida', 'ajuste'], required: true },
  cantidad: { type: Number, required: true },
  motivo: { type: String }, 
}, { timestamps: true });


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



const ConfiguracionPOSSchema = new  mongoose.Schema({
  sucursal: { type:  mongoose.Schema.Types.ObjectId, ref: 'Sucursal', required: true, unique: true },
  colores: {
    primario: { type: String, default: '#FF0000' },
    secundario: { type: String, default: '#FFFFFF' }
  },
  formatoTicket: { type: String, default: '80mm' },
  mostrarPropinas: { type: Boolean, default: false }
}, { timestamps: true });


const MenuPOSSchema = new mongoose.Schema({
  sucursal: { type: mongoose.Schema.Types.ObjectId, ref: 'Sucursal', required: true },
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  visible: { type: Boolean, default: true },
  orden: { type: Number, default: 0 } 
}, { timestamps: true });


const SubscripcionSchema = new mongoose.Schema({
  nombre: { type: String, required: true }, // Tipo o nombre de subscripcion
  precio: { type: Number, required: true },
  duracionDias: { type: Number, required: true }, 
  caracteristicas: [{ type: String }], //['Acceso total', 'Soporte']
  activo: { type: Boolean, default: true }
}, { timestamps: true });



const EmpresaSubscripcionSchema = new mongoose.Schema({
  empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true },
  subscripcion: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscripcion', required: true },
  fechaInicio: { type: Date, default: Date.now },
  fechaFin: { type: Date, required: true },
  estado: { type: String, enum: ['activa', 'vencida', 'cancelada'], default: 'activa' },
  pagoReferencia: { type: String }
}, { timestamps: true });


module.exports = mongoose.model('EmpresaSubscripcion', EmpresaSubscripcionSchema);
module.exports = mongoose.model('Subscripcion', SubscripcionSchema);
module.exports = mongoose.model('MenuPOS', MenuPOSSchema);
module.exports = mongoose.model('ConfiguracionPos', ConfiguracionPOSSchema);
module.exports = mongoose.model('Pedido', PedidoSchema);
module.exports = mongoose.model('MovimientoInventario', MovimientoInventarioSchema);
module.exports = mongoose.model('Inventario', InventarioSchema);
module.exports = mongoose.model('Producto', ProductoSchema);
module.exports = mongoose.model('Categoria', CategoriaSchema);
module.exports = mongoose.model('Cliente', ClienteSchema);
module.exports = mongoose.model('Sucursal', EmpleadoSchema);