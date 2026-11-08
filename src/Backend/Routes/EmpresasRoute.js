const express = require('express');
const router = express.Router();
const {
    listarEmpresas,
    obtenerEmpresaPorId,
    crearEmpresa,
    actualizarEmpresa,
    desactivarEmpresa
} = require('../Controllers/EmpresaController');

router.get('/', listarEmpresas);
router.get('/:id', obtenerEmpresaPorId);
router.post('/', crearEmpresa);
router.put('/:id', actualizarEmpresa);
router.delete('/:id', desactivarEmpresa);

module.exports = router;