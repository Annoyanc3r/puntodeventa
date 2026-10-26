const express = require('express');
const router = express.Router();
const { ConfiguracionPos } = require('../Models/modelos');

// Obtener configuración por sucursal
router.get('/sucursal/:sucursalId', async (req, res) => {
  try {
    const config = await ConfiguracionPos.findOne({ sucursal: req.params.sucursalId });
    if (!config) return res.status(404).json({ error: 'Configuración no encontrada' });
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear configuración
router.post('/', async (req, res) => {
  try {
    const nueva = await ConfiguracionPos.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Modificar configuración
router.put('/:id', async (req, res) => {
  try {
    const actualizada = await ConfiguracionPos.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!actualizada) return res.status(404).json({ error: 'Configuración no encontrada' });
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;