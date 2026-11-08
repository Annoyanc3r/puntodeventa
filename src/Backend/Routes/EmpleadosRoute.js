const express = require('express');
const router = express.Router();
const {
    listarEmpleados,
    empleadosPorSucursal,
    obtenerEmpleadoPorId,
    crearEmpleado,
    modificarEmpleado,
    desactivarEmpleado
} = require('../Controllers/EmpleadoController');

router.get('/', listarEmpleados);
router.get('/sucursal/:sucursalId', empleadosPorSucursal);
router.get('/:id', obtenerEmpleadoPorId);
router.post('/', crearEmpleado);
router.put('/:id', modificarEmpleado);
router.delete('/:id', desactivarEmpleado);

module.exports = router;