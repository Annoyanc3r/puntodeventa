const express = require('express');
const router = express.Router();
const {
    listarPedidos,
    pedidosPorSucursalYEstado,
    obtenerPedidoPorId,
    crearPedido,
    cambiarEstadoPedido
} = require('../Controllers/PedidoController');

router.get('/', listarPedidos);
router.get('/sucursal/:sucursalId', pedidosPorSucursalYEstado);
router.get('/:id', obtenerPedidoPorId);
router.post('/', crearPedido);
router.put('/:id', cambiarEstadoPedido);

module.exports = router;