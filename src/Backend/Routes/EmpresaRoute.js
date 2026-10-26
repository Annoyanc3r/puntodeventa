const express = require('express');
const router = express.Router();
const Empresa = require('../Models/Empresa');

//Get traer todas las empresas
router.get('/', async (req, res) => {
  try {
    const empresas = await Empresa.find();
    res.json(empresas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Traer una empresa por ID
//Solamente trae las empresas que estan activas
router.get('/:id', async(req,res)=>{

    try{ 
        const usuario = await Empresa.findById(req.params.id);
        if(!usuario)return res.status(404).json({msg: "Esta empresa no existe"});
        res.json(usuario);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});



//Crear una nueva empresa

router.post('/', async (req, res) => {
  try {
    const nueva = await Empresa.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Hacerle update a la empresa
//basicamente actualizar la informacion de cierta empresa por su ID
router.put('/:id', async (req, res) => {
  try {
    const actualizada = await Empresa.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } 
    );
    
    if (!actualizada) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }
    
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




//dar de baja una empresa

router.delete('/:id', async (req, res) => {
  try {
    const desactivada = await Empresa.findByIdAndUpdate(
      req.params.id, 
      { activo: false }, 
      { new: true }
    );

    if (!desactivada) {
      return res.status(404).json({ error: 'No se encontro la empresa' });
    }

    res.json({ mensaje: 'Empresa Eliminada', empresa: desactivada });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;