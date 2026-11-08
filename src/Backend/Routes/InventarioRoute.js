const express = require('express');
const router = express.Router();
const {
    listarInventario,
    inventarioPorSucursal,
    obtenerInventarioPorId,
    crearInventario,
    modificarInventario,
    eliminarInventario
} = require('../Controllers/InventarioController');

router.get('/', listarInventario);
router.get('/sucursal/:sucursalId', inventarioPorSucursal);
router.get('/:id', obtenerInventarioPorId);
router.post('/', crearInventario);
router.put('/:id', modificarInventario);
router.delete('/:id', eliminarInventario);

module.exports = router;