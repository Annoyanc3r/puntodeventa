const express = require('express');
const router = express.Router();
const {
    listarUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    loginUsuario
} = require('../Controllers/UsuarioController');


router.post('/login', loginUsuario); 

router.get('/', listarUsuarios);
router.get('/:id', obtenerUsuarioPorId);
router.post('/', crearUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;