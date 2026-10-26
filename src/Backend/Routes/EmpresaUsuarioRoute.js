const express = require('express');
const router = express.Router();
const EmpresaUsuario = require('../Models/EmpresaUsuario');


//Obtiene todos los usuarios y las empresas que estan ligadas.
router.get('/', async (req, res) => {
  try {
   
    const relaciones = await EmpresaUsuario.find()
      .populate('empresa', 'nombre rfc') 
      .populate('usuario', 'nombre email rol'); 
    
    res.json(relaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//regresa un usuario y empresa en especifico

router.get('/:id', async (req, res) => {
  try {
    const relacion = await EmpresaUsuario.findById(req.params.id)
      .populate('empresa', 'nombre rfc')
      .populate('usuario', 'nombre email rol');

    if (!relacion) {
      return res.status(404).json({ error: 'Relación no encontrada' });
    }
    res.json(relacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//crea una empresa y usuario

router.post('/', async (req, res) => {
  try {
    const nuevaRelacion = await EmpresaUsuario.create(req.body);
    res.status(201).json(nuevaRelacion);
  } catch (error) {
   
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: 'Este usuario ya está asignado a esta empresa.' 
      });
    }
    res.status(400).json({ error: error.message });
  }
});


//modifica solamente el rol de usuario dentro de la empresa

router.put('/:id', async (req, res) => {
  try {
   
    const actualizada = await EmpresaUsuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!actualizada) {
      return res.status(404).json({ error: 'Relación no encontrada' });
    }
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//baja logica dentro de los usuarios
router.delete('/:id', async (req, res) => {
  try {
    const eliminada = await EmpresaUsuario.findByIdAndDelete(req.params.id);
    
    if (!eliminada) {
      return res.status(404).json({ error: 'Relación no encontrada' });
    }
    res.json({ mensaje: 'Usuario removido de la empresa correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;