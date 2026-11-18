Usando MongoDB, React y JS

Instrucciones para la IA:
Este documento describe todos los modelos de datos (esquemas de Mongoose/MongoDB), la estructura del Backend (Express), el archivo server.js de referencia y el servicio de autenticación del frontend (authService.js) del sistema POS. Úsalo como fuente única de verdad para entender la estructura de la base de datos, las relaciones entre entidades, las reglas de negocio implícitas y los endpoints disponibles. No inventes campos, relaciones, modelos ni rutas que no estén listados aquí. Si necesitas generar código (consultas, controladores, servicios, validaciones, migraciones, componentes React, etc.), basa tus respuestas estrictamente en lo definido en este documento.

Stack tecnológico: MongoDB + Mongoose, Node.js + Express, React + JavaScript (JS).
Arquitectura: Backend en /src/Backend/ (Models, Routes, Controllers), Frontend React consumiendo la API en http://localhost:4000.

PARTE 1 — MODELOS DE BASE DE DATOS (Mongoose)
Autenticación
Usuario
Campo	Tipo	Notas
nombre	String	requerido
email	String	requerido, único, lowercase
password	String	requerido, hash bcrypt (hook pre('save'))
rol	String	default: 'admin'
Multi-empresa / Multi-sucursal
Empresa
nombre (req), rfc, activo (default true)

Sucursal
empresa → Empresa (req), nombre (req), direccion, codigoPostal, telefono, activo

EmpresaUsuario (relación N:M)
empresa → Empresa (req), usuario → Usuario (req), rolEnEmpresa (default 'admin')

Índice único compuesto: (empresa, usuario)

Suscripciones
Subscripcion
nombre (req), precio (req), duracionDias (req), caracteristicas[] (String), activo

EmpresaSubscripcion
empresa → Empresa (req), subscripcion → Subscripcion (req)

fechaInicio (default now), fechaFin (req)

estado: activa | vencida | cancelada (default activa)

pagoReferencia

👥 Personas
Cliente
nombre (req), email, telefono, direccion

Empleado
sucursal → Sucursal (req), usuario → Usuario (opcional)

nombre (req), puesto, activo

Catálogo e Inventario
Categoria
nombre (req), descripcion, activo

Producto
categoria → Categoria (req), nombre (req), descripcion, precioBase (req), imagen (URL), activo

Inventario (por sucursal)
sucursal → Sucursal (req), producto → Producto (req)

stock (default 0), stockMinimo (default 5), precioVenta (req)

Índice único: (sucursal, producto)

MovimientoInventario
inventario → Inventario (req), empleado → Empleado (req)

tipo: entrada | salida | ajuste (req)

cantidad (req), motivo

MenuPOS (visibilidad por sucursal)
sucursal → Sucursal (req), producto → Producto (req)

visible (default true), orden (default 0)

Punto de Venta
Pedido
sucursal → Sucursal (req), cliente → Cliente (opcional), empleado → Empleado (req)

estado: pendiente | en_cocina | listo | pagado | cancelado

total (req)

detalles[]: producto, nombreProducto, cantidad, precioUnitario, subtotal, notas

pagos[]: metodo (efectivo|tarjeta|transferencia), monto, referencia, fechaPago

ConfiguracionPos (1 por sucursal)
sucursal → Sucursal (req, único)

colores: { primario: '#FF0000', secundario: '#FFFFFF' }

formatoTicket (default '80mm'), mostrarPropinas (default false)

Mapa de Relaciones
text
Empresa ──< Sucursal ──< Inventario >── Producto >── Categoria
│              │                            │
│              ├──< MenuPOS >───────────────┤
│              ├──< Empleado >─── Usuario   │
│              ├──< Pedido ──< detalles >───┘
│              │        └──< pagos
│              └── ConfiguracionPos (1:1)
├──< EmpresaUsuario >── Usuario
└──< EmpresaSubscripcion >── Subscripcion
PARTE 2 — ESTRUCTURA DEL BACKEND
Organización de archivos
text
/src/Backend/
├── Models/       ← esquemas Mongoose (ver Parte 1)
├── Routes/       ← routers de Express
└── Controllers/  ← lógica de cada ruta
Cada ruta se importa desde ./src/Backend/Routes/<Nombre>Route.js y se monta en /api/<prefijo> dentro de server.js.

Estructura completa del proyecto
text
raíz/
├── .env               ← REACT_APP_MONGO_URL, REACT_APP_API_URL, PORT
├── server.js          ← punto de entrada backend
├── package.json
└── src/
    ├── Backend/
    │   ├── Models/       ← Usuario.js, Empresa.js, Sucursal.js, ...
    │   ├── Routes/       ← UsuariosRoute.js, EmpresasRoute.js, ...
    │   └── Controllers/  ← lógica de cada ruta
    └── Frontend/         ← app React (JS)
        ├── components/
        ├── pages/
        └── services/     ← llamadas a /api/...  (incluye authService.js)
Tabla de Endpoints disponibles
Prefijo de ruta	Router	Modelo(s) principal(es)
/api/usuario	UsuariosRoute	Usuario
/api/empresa	EmpresasRoute	Empresa
/api/empresaUsuario	EmpresaUsuarioRoute	EmpresaUsuario
/api/sucursal	SucursalesRoute	Sucursal
/api/empleados	EmpleadosRoute	Empleado
/api/clientes	ClientesRoute	Cliente
/api/categorias	CategoriasRoute	Categoria
/api/productos	ProductosRoute	Producto
/api/inventario	InventarioRoute	Inventario
/api/movimientos	MovimientoInventarioRoute	MovimientoInventario
/api/pedidos	PedidosRoute	Pedido
/api/configuracion-pos	ConfiguracionPosRoute	ConfiguracionPos
/api/menu-pos	MenuPosRoute	MenuPOS
/api/subscripciones	SubscripcionesRoute	Subscripcion
/api/empresa-subscripcion	EmpresaSubscripcionRoute	EmpresaSubscripcion
Sub-rutas conocidas sobre /api/usuario (usadas por authService.js)
Método	Ruta	Descripción
POST	/api/usuario/login	Autenticación. Body: { email, password }. Devuelve { usuario: { _id, email, ... } } (puede incluir un msg/error en caso de fallo).
POST	/api/usuario	Registro de usuario. Body permitido: { nombre, email, password } (nunca rol ni _id desde el cliente).
GET	/api/usuario/checkSubscription/:email	Verifica suscripción de la empresa asociada al usuario. Devuelve { verificacion: true/false, ... }. Un 200 con verificacion: false no es error.
PARTE 3 — server.js (archivo de referencia)
js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());           // permite peticiones desde React (localhost:3000/5173)
app.use(express.json());

const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Google DNS


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
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));
Detalles clave del servidor
Framework: Express

Base de datos: MongoDB vía Mongoose

CORS: habilitado para React (localhost:3000 / localhost:5173)

JSON parser: express.json()

DNS: configurado con Google DNS (8.8.8.8, 8.8.4.4)

Puerto: process.env.PORT o 4000

Variables de entorno: REACT_APP_MONGO_URL (cadena de conexión MongoDB) y REACT_APP_API_URL (URL base del backend consumida por el frontend)

Frontend React: consume la API en http://localhost:4000

PARTE 4 — authService.js (Frontend)
Servicio del frontend (ubicado en src/Frontend/services/authService.js) que centraliza las llamadas de autenticación contra /api/usuario. Usa REACT_APP_API_URL (fallback http://localhost:4000) como base.

js
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const API = `${BASE_URL}/api/usuario`;

export const login = async (email, password) => {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();

  sessionStorage.setItem("user_Email", data.usuario.email);
  sessionStorage.setItem("user_ID", data.usuario._id);

  if (!res.ok) throw new Error(data.msg || data.error || 'Error al iniciar sesión');
  return data;
};

export const register = async ({ nombre, email, password }) => {
  // Solo enviamos los campos permitidos; nunca 'rol' ni '_id' desde el cliente
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    // Mongo devuelve errores con distinta forma; normalizamos
    const mensaje =
      data.msg ||
      data.error ||
      (data.errors && Object.values(data.errors)[0]?.message) ||
      'Error al registrar usuario';
    throw new Error(mensaje);
  }
  return data;
};

export const verificarSubscripcion = async (email) => {
  if (!email || !email.includes('@')) {
    throw new Error('Email inválido');
  }

  const res = await fetch(`${API}/checkSubscription/${encodeURIComponent(email)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();

  // El backend devuelve 200 con verificacion:false cuando no hay empresa/suscripción.
  // Solo tratamos como error los 4xx/5xx reales.
  if (!res.ok) {
    throw new Error(data.msg || data.error || 'Error al verificar suscripción');
  }

  return data;
};
Contrato y reglas de authService.js
Base URL: process.env.REACT_APP_API_URL || 'http://localhost:4000'; el servicio apunta al prefijo /api/usuario.

login(email, password)

POST /api/usuario/login con { email, password }.

Al responder OK, guarda en sessionStorage:

user_Email ← data.usuario.email

user_ID ← data.usuario._id

En caso de fallo lanza Error con data.msg || data.error || 'Error al iniciar sesión'.

La respuesta esperada contiene usuario: { _id, email, ... }.

register({ nombre, email, password })

POST /api/usuario enviando solo nombre, email, password.

Nunca se envía rol ni _id desde el cliente (el backend aplica el default 'admin').

Los errores se normalizan considerando las variantes de Mongoose (data.errors[0].message).

verificarSubscripcion(email)

Valida que email contenga @ antes de llamar.

GET /api/usuario/checkSubscription/:email (email codificado con encodeURIComponent).

Un 200 con verificacion: false no es error: significa que no hay empresa/suscripción asociada.

Solo lanza error si la respuesta HTTP es 4xx/5xx.

Persistencia de sesión: sessionStorage con las claves user_Email y user_ID. No se persisten tokens ni el objeto usuario completo.

Notas y consideraciones
Usuario aparecía duplicado 3 veces en el archivo original de esquemas → consolidado en una sola definición.

Categoria estaba referenciado por Producto pero no definido → agregado.

MovimientoInventario no actualiza stock automáticamente; la lógica de actualización de Inventario.stock debe implementarse en el controller correspondiente.

Pedido.detalles guarda nombreProducto y precioUnitario como snapshot histórico (no se recalcula si cambia el producto).

ConfiguracionPos es 1:1 con Sucursal (índice unique en sucursal).

El prefijo de ruta /api/empresaUsuario usa camelCase, mientras el resto usa kebab-case o minúsculas — respetar esa inconsistencia al generar clientes HTTP.

Los modelos de backend viven en /src/Backend/Models/ y las rutas en /src/Backend/Routes/, según las importaciones de server.js.

El frontend React consume la API en http://localhost:4000 (o REACT_APP_API_URL si está definido).

Autenticación en frontend: centralizada en authService.js; después de un login exitoso, user_Email y user_ID quedan en sessionStorage.

El registro (register) solo envía { nombre, email, password }; el rol lo determina el backend (default 'admin').

La verificación de suscripción usa GET /api/usuario/checkSubscription/:email; un 200 con verificacion:false no es error.

Checklist para la IA al generar código
□ Usar exclusivamente los campos definidos en la Parte 1.
□ Respetar las referencias (ObjectId + ref) y sus nombres exactos.
□ No inventar endpoints fuera de la tabla de la Parte 2 (incluyendo las sub-rutas de /api/usuario usadas por authService.js).
□ Respetar el stack: MongoDB + Mongoose + Express + React + JS.
□ Mantener consistencia con los nombres de rutas y modelos.
□ Si se requiere lógica de negocio (ej. actualizar stock), implementarla en controllers, no en los esquemas.
□ Usar http://localhost:4000 (o REACT_APP_API_URL) como base URL de la API en el frontend.
□ Reutilizar authService.js para login / registro / verificación de suscripción; no duplicar la lógica de fetch en componentes.
□ Tras login exitoso, leer user_Email y user_ID desde sessionStorage.
□ En register, no enviar rol ni _id desde el cliente.
□ En verificarSubscripcion, tratar 200 + verificacion:false como “sin suscripción”, no como error.