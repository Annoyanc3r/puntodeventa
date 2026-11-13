const express = require('express');
const router = express.Router();
const {
    listarUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    loginUsuario,
    verificarSubscripcion
} = require('../Controllers/UsuarioController');


router.post('/login', loginUsuario); 

router.get('/:usuario:correo', verificarSubscripcion);

router.get('/', listarUsuarios);
router.get('/:id', obtenerUsuarioPorId);
router.post('/', crearUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;