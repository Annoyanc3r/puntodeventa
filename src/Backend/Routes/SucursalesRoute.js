const express = require('express');
const router = express.Router();
const {
    listarSucursales,
    sucursalesPorEmpresa,
    obtenerSucursalPorId,
    crearSucursal,
    modificarSucursal,
    desactivarSucursal,
    crearSucursalDesdeUsuario,
    obtenerSucursalesPorUsuario,
    darBajaSucursalPorUsuario
} = require('../Controllers/SucursalController');



router.get('/', listarSucursales);
router.get('/empresa/:empresaId', sucursalesPorEmpresa);
router.get('/:id', obtenerSucursalPorId);
router.post('/', crearSucursal);
router.put('/:id', modificarSucursal);
router.delete('/:id', desactivarSucursal);

router.post('/Sucursal_Usuario', crearSucursalDesdeUsuario);
router.get('/Sucursal_Usuario/:ID_usuario', obtenerSucursalesPorUsuario);
router.patch('/baja/:id', darBajaSucursalPorUsuario);

module.exports = router;