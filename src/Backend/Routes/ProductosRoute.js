const express = require('express');
const router = express.Router();
const {
    listarProductos,
    productosPorCategoria,
    obtenerProductoPorId,
    crearProducto,
    modificarProducto,
    desactivarProducto
} = require('../Controllers/ProductoController');

router.get('/', listarProductos);
router.get('/categoria/:categoriaId', productosPorCategoria);
router.get('/:id', obtenerProductoPorId);
router.post('/', crearProducto);
router.put('/:id', modificarProducto);
router.delete('/:id', desactivarProducto);

module.exports = router;