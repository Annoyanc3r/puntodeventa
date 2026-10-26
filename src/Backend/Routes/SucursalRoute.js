const express = require('express');
const router = express.Router();
const Sucursal = require('../Models/Sucursal');


//Regresa todas las sucursales
router.get('/', async (req, res) => {
  try {
 
    const sucursales = await Sucursal.find()
      .populate('empresa', 'nombre rfc'); 
    
    res.json(sucursales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Traer una sucursales de una empresa específica

router.get('/empresa/:empresaId', async (req, res) => {
  try {
    const sucursales = await Sucursal.find({ 
      empresa: req.params.empresaId,
      activo: true
    });
    
    res.json(sucursales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



//obtener una sucursal en especifico
router.get('/:id', async (req, res) => {
  try {
    const sucursal = await Sucursal.findById(req.params.id)
      .populate('empresa', 'nombre rfc');

    if (!sucursal) {
      return res.status(404).json({ error: 'Sucursal no encontrada' });
    }
    res.json(sucursal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//Crear sucursal

router.post('/', async (req, res) => {
  try {
    const nueva = await Sucursal.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//Modificar sucursal

router.put('/:id', async (req, res) => {
  try {
    const actualizada = await Sucursal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!actualizada) {
      return res.status(404).json({ error: 'Sucursal no existe' });
    }
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Baja logica de sucursal

router.delete('/:id', async (req, res) => {
  try {
    const desactivada = await Sucursal.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true }
    );

    if (!desactivada) {
      return res.status(404).json({ error: 'Esta sucursal no existe' });
    }
    res.json({ mensaje: 'Sucursal desactivada correctamente', sucursal: desactivada });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;