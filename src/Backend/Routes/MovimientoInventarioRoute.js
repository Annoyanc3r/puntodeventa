const express = require('express');
const router = express.Router();
const { MovimientoInventario } = require('../Models/Movimientoinventario');

// Listar movimientos
router.get('/', async (req, res) => {
  try {
    const movimientos = await MovimientoInventario.find().populate('inventario').populate('empleado', 'nombre');
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Movimientos por inventario
router.get('/inventario/:inventarioId', async (req, res) => {
  try {
    const movimientos = await MovimientoInventario.find({ inventario: req.params.inventarioId }).sort({ createdAt: -1 });
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear movimiento
router.post('/', async (req, res) => {
  try {
    const nuevo = await MovimientoInventario.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;