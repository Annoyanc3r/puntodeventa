const express = require('express');
const router = express.Router();
const {
    listarClientes,
    obtenerClientePorId,
    crearCliente,
    modificarCliente,
    eliminarCliente
} = require('../Controllers/ClienteController');

router.get('/', listarClientes);
router.get('/:id', obtenerClientePorId);
router.post('/', crearCliente);
router.put('/:id', modificarCliente);
router.delete('/:id', eliminarCliente);

module.exports = router;