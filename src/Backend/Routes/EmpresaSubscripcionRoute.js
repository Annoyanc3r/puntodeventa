const express = require('express');
const router = express.Router();
const  EmpresaSubscripcion  = require('../Models/EmpresaSubscripcion');

// Listar relaciones Empresa-Subscripción
router.get('/', async (req, res) => {
  try {
    const relaciones = await EmpresaSubscripcion.find().populate('empresa', 'nombre').populate('subscripcion', 'nombre precio');
    res.json(relaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Subscripción activa por empresa
router.get('/empresa/:empresaId', async (req, res) => {
  try {
    const relacion = await EmpresaSubscripcion.findOne({ empresa: req.params.empresaId, estado: 'activa' }).populate('subscripcion', 'nombre precio caracteristicas');
    if (!relacion) return res.status(404).json({ error: 'La empresa no tiene subscripción activa' });
    res.json(relacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear relación Empresa-Subscripción
router.post('/', async (req, res) => {
  try {
    const nueva = await EmpresaSubscripcion.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Modificar estado o fechas de subscripción
router.put('/:id', async (req, res) => {
  try {
    const actualizada = await EmpresaSubscripcion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!actualizada) return res.status(404).json({ error: 'Relación no encontrada' });
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;