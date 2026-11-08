const express = require('express');
const router = express.Router();
const {
    listarEmpresaSubcripciones,
    subscripcionActivaPorEmpresa,
    crearEmpresaSubcripcion,
    modificarEmpresaSubcripcion
} = require('../Controllers/EmpresaSubcripcionController');

router.get('/', listarEmpresaSubcripciones);
router.get('/empresa/:empresaId', subscripcionActivaPorEmpresa);
router.post('/', crearEmpresaSubcripcion);
router.put('/:id', modificarEmpresaSubcripcion);

module.exports = router;