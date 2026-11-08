const express = require('express');
const router = express.Router();
const {
    listarSucursales,
    sucursalesPorEmpresa,
    obtenerSucursalPorId,
    crearSucursal,
    modificarSucursal,
    desactivarSucursal
} = require('../Controllers/SucursalController');

router.get('/', listarSucursales);
router.get('/empresa/:empresaId', sucursalesPorEmpresa);
router.get('/:id', obtenerSucursalPorId);
router.post('/', crearSucursal);
router.put('/:id', modificarSucursal);
router.delete('/:id', desactivarSucursal);

module.exports = router;