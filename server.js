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


const UsuariosRouter = require('./src/Backend/Routes/UsuariosRoute');
const EmpresaRouter = require('./src/Backend/Routes/EmpresaRoute');
const EmpresaUsuarioRouter = require('./src/Backend/Routes/EmpresaUsuarioRoute');
const SucursalRouter = require('./src/Backend/Routes/SucursalRoute');



app.use('/api/empleados', require('./routes/empleado'));
app.use('/api/clientes', require('./routes/cliente'));
app.use('/api/categorias', require('./routes/categoria'));
app.use('/api/productos', require('./routes/producto'));
app.use('/api/inventario', require('./routes/inventario'));
app.use('/api/movimientos', require('./routes/movimientoInventario'));
app.use('/api/pedidos', require('./routes/pedido'));
app.use('/api/configuracion-pos', require('./routes/configuracionPos'));
app.use('/api/menu-pos', require('./routes/menuPos'));
app.use('/api/subscripciones', require('./routes/subscripcion'));
app.use('/api/empresa-subscripcion', require('./routes/empresaSubscripcion'));


app.use('/api/usuarios', UsuariosRouter);
app.use('/api/empresas', EmpresaRouter);
app.use('/api/empresaUsuario', EmpresaUsuarioRouter);
app.use('/api/sucursal', SucursalRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 API en http://localhost:${PORT}`));