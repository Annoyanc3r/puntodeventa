const express = require('express');
const router = express.Router();
const {
    listarCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    modificarCategoria,
    desactivarCategoria
} = require('../Controllers/CategoriaController');

router.get('/', listarCategorias);
router.get('/:id', obtenerCategoriaPorId);
router.post('/', crearCategoria);
router.put('/:id', modificarCategoria);
router.delete('/:id', desactivarCategoria);

module.exports = router;