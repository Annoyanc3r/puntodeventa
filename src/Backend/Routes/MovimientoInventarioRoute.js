const express = require('express');
const router = express.Router();
const {
    listarMovimientos,
    movimientosPorInventario,
    crearMovimiento
} = require('../Controllers/MovimientoInventarioController');

router.get('/', listarMovimientos);
router.get('/inventario/:inventarioId', movimientosPorInventario);
router.post('/', crearMovimiento);

module.exports = router;