const express = require('express');
const router = express.Router();
const {
    obtenerConfigPorSucursal,
    crearConfiguracion,
    modificarConfiguracion
} = require('../Controllers/ConfiguracionPosController');

router.get('/sucursal/:sucursalId', obtenerConfigPorSucursal);
router.post('/', crearConfiguracion);
router.put('/:id', modificarConfiguracion);

module.exports = router;