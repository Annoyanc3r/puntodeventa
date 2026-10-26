const express = require('express');
const router = express.Router();
const  Subscripcion  = require('../Models/Subscripcion');

// Listar subscripciones
router.get('/', async (req, res) => {
  try {
    const subscripciones = await Subscripcion.find({ activo: true });
    res.json(subscripciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener subscripción por ID
router.get('/:id', async (req, res) => {
  try {
    const subscripcion = await Subscripcion.findById(req.params.id);
    if (!subscripcion) return res.status(404).json({ error: 'Subscripción no encontrada' });
    res.json(subscripcion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear subscripción
router.post('/', async (req, res) => {
  try {
    const nueva = await Subscripcion.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Modificar subscripción
router.put('/:id', async (req, res) => {
  try {
    const actualizada = await Subscripcion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!actualizada) return res.status(404).json({ error: 'Subscripción no encontrada' });
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Baja lógica de subscripción
router.delete('/:id', async (req, res) => {
  try {
    const desactivada = await Subscripcion.findByIdAndUpdate(req.params.id, { activo: false }, { new: true });
    if (!desactivada) return res.status(404).json({ error: 'Subscripción no encontrada' });
    res.json({ mensaje: 'Subscripción desactivada', subscripcion: desactivada });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;