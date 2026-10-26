require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Usuario = require('../Models/Usuarios.js');
const Empresa = require('../Models/Empresa.js');


const app = express();
app.use(cors());           // permite peticiones desde React (localhost:3000/5173)
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.REACT_APP_MONGO_URL)
  .then(() => console.log('MongoDB esta conectado'))
  .catch(err => console.error('MongoDB no cargo correctamente:', err));

// GET - listar todos los usuarios
app.get('/api/usuarios', async (req, res) => {
  try {

   
    const usuarios = await Usuario.find().select('-password'); // no devolver password
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - un usuario por id
app.get('/api/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-password');
    if (!usuario) return res.status(404).json({ msg: 'No encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - crear usuario
app.post('/api/usuarios', async (req, res) => {
  try {
    const nuevo = await Usuario.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT - actualizar
app.put('/api/usuarios/:id', async (req, res) => {
  try {
    const actualizado = await Usuario.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    ).select('-password');
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
app.delete('/api/usuarios/:id', async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));

module.exports = router;