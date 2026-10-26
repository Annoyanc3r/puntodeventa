require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());           // permite peticiones desde React (localhost:3000/5173)
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.REACT_APP_MONGO_URL)
  .then(() => console.log('MongoDB esta conectado'))
  .catch(err => console.error('MongoDB no cargo correctamente:', err));


// --- Importación de Rutas ---
const UsuariosRouter = require('./src/Backend/Routes/UsuariosRoute');
const EmpresasRouter = require('./src/Backend/Routes/EmpresasRoute');
const EmpresaUsuarioRouter = require('./src/Backend/Routes/EmpresaUsuarioRoute');
const SucursalesRouter = require('./src/Backend/Routes/SucursalesRoute');

const EmpleadosRouter = require('./src/Backend/Routes/EmpleadosRoute');
const ClientesRouter = require('./src/Backend/Routes/ClientesRoute');
const CategoriasRouter = require('./src/Backend/Routes/CategoriasRoute');
const ProductosRouter = require('./src/Backend/Routes/ProductosRoute');
const InventarioRouter = require('./src/Backend/Routes/InventarioRoute');
const MovimientosRouter = require('./src/Backend/Routes/MovimientoInventarioRoute');
const PedidosRouter = require('./src/Backend/Routes/PedidosRoute');
const ConfiguracionPOSRouter = require('./src/Backend/Routes/ConfiguracionPosRoute');
const MenuPOSRouter = require('./src/Backend/Routes/MenuPosRoute');
const SubscripcionesRouter = require('./src/Backend/Routes/SubscripcionesRoute');
const EmpresaSubscripcionRouter = require('./src/Backend/Routes/EmpresaSubscripcionRoute');

// --- Uso de Rutas (Endpoints) ---
app.use('/api/usuario', UsuariosRouter);
app.use('/api/empresa', EmpresasRouter);
app.use('/api/empresaUsuario', EmpresaUsuarioRouter);
app.use('/api/sucursal', SucursalesRouter);

app.use('/api/empleados', EmpleadosRouter);
app.use('/api/clientes', ClientesRouter);
app.use('/api/categorias', CategoriasRouter);
app.use('/api/productos', ProductosRouter);
app.use('/api/inventario', InventarioRouter);
app.use('/api/movimientos', MovimientosRouter);
app.use('/api/pedidos', PedidosRouter);
app.use('/api/configuracion-pos', ConfiguracionPOSRouter);
app.use('/api/menu-pos', MenuPOSRouter);
app.use('/api/subscripciones', SubscripcionesRouter);
app.use('/api/empresa-subscripcion', EmpresaSubscripcionRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 API en http://localhost:${PORT}`));