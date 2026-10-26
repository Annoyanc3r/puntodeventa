const express = require('express');
const router = express.Router();
const { Cliente } = require('../Models/Cliente');

// Listar clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener cliente por ID
router.get('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear cliente
router.post('/', async (req, res) => {
  try {
    const nuevo = await Cliente.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Modificar cliente
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!actualizado) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar cliente
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Cliente.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json({ mensaje: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;