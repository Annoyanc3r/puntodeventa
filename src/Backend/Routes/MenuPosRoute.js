const express = require('express');
const router = express.Router();
const {
    listarMenuPorSucursal,
    crearMenuPos,
    modificarMenuPos,
    eliminarMenuPos
} = require('../Controllers/MenuPosController');

router.get('/sucursal/:sucursalId', listarMenuPorSucursal);
router.post('/', crearMenuPos);
router.put('/:id', modificarMenuPos);
router.delete('/:id', eliminarMenuPos);

module.exports = router;