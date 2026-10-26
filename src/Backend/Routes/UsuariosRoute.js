const express = require('express');
const router = express.Router();
const Usuario = require('../Models/Usuarios');

//Get traer todos los usuarios
router.get('/', async(req,res)=>{
try{
    const usuarios = await Usuario.find().select('-password');
    res.json(usuarios);
}catch(error){
    res.status(500).json({error:error.message});
}
});


//traer un usuario por ID 

router.get('/:id', async(req,res)=>{

    try{ 
        const usuario = await Usuario.findById(req.params.id).select('-password');
        if(!usuario)return res.status(404).json({msg: "No encontrado"});
        res.json(usuario);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

//Crear un usuario
router.post('/',async(req,res)=>{
try{

    const NuevoUsuario = await Usuario.create(req.body);
    res.status(201).json(NuevoUsuario);

}catch(error){

    res.status(400).json({error:error.message})
}
});

//Hacerle update al usuario
//basicamente actualizar la informacion de cierto usuario por su ID
router.put('/:id', async(req,res)=>{
try{
    const UsuarioActualizado = await Usuario.findByIdAndUpdate(
        req.params.id,req.body, { new: true, runValidators: true }).select('-password');

    res.json(UsuarioActualizado);

}
catch(error){
    res.status(400).json({error:error.message});
}

});


//Elimina el usuario
router.delete('/:id', async (req,res)=>{

    try{
        const usuario_eliminado = await Usuario.findByIdAndDelete(req.params.id);
        res.json({usuario: usuario_eliminado.nombre, id: usuario_eliminado._id, eliminado: 'true'
    });
        
    }
    catch(error){
        res.status(500).json({error:error.essage});
    }
})


module.exports = router;