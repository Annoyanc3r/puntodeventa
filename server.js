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



app.use('/api/usuarios', UsuariosRouter);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 API en http://localhost:${PORT}`));