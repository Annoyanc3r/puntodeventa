const express = require('express');
const router = express.Router();
const {
    listarEmpresaUsuarios,
    obtenerEmpresaUsuarioPorId,
    crearEmpresaUsuario,
    actualizarEmpresaUsuario,
    eliminarEmpresaUsuario
} = require('../Controllers/EmpresaUsuarioController');

router.get('/', listarEmpresaUsuarios);
router.get('/:id', obtenerEmpresaUsuarioPorId);
router.post('/', crearEmpresaUsuario);
router.put('/:id', actualizarEmpresaUsuario);
router.delete('/:id', eliminarEmpresaUsuario);

module.exports = router;