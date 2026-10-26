const express = require('express');
const router = express.Router();
const   Empleado  = require('../Models/Empleado'); 

// Listar empleados
router.get('/', async (req, res) => {
  try {
    const empleados = await Empleado.find().populate('sucursal', 'nombre').populate('usuario', 'nombre email');
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Empleados por sucursal
router.get('/sucursal/:sucursalId', async (req, res) => {
  try {
    const empleados = await Empleado.find({ sucursal: req.params.sucursalId, activo: true });
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener empleado por ID
router.get('/:id', async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id).populate('sucursal', 'nombre').populate('usuario', 'nombre email');
    if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear empleado
router.post('/', async (req, res) => {
  try {
    const nuevo = await Empleado.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Modificar empleado
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!actualizado) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Baja lógica de empleado
router.delete('/:id', async (req, res) => {
  try {
    const desactivado = await Empleado.findByIdAndUpdate(req.params.id, { activo: false }, { new: true });
    if (!desactivado) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json({ mensaje: 'Empleado desactivado', empleado: desactivado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;