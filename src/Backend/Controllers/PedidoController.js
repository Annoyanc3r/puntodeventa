const Pedido = require('../Models/Pedido');

// Listar pedidos
const listarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find()
            .populate('sucursal', 'nombre')
            .populate('empleado', 'nombre')
            .populate('cliente', 'nombre');
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Pedidos por sucursal y estado
const pedidosPorSucursalYEstado = async (req, res) => {
    try {
        const filtro = { sucursal: req.params.sucursalId };
        if (req.query.estado) filtro.estado = req.query.estado;
        
        const pedidos = await Pedido.find(filtro)
            .populate('empleado', 'nombre')
            .populate('cliente', 'nombre');
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener pedido por ID
const obtenerPedidoPorId = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id)
            .populate('sucursal', 'nombre')
            .populate('empleado', 'nombre')
            .populate('cliente', 'nombre');
        if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear pedido
const crearPedido = async (req, res) => {
    try {
        const nuevo = await Pedido.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Cambiar estado de pedido
const cambiarEstadoPedido = async (req, res) => {
    try {
        const actualizado = await Pedido.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!actualizado) return res.status(404).json({ error: 'Pedido no encontrado' });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    listarPedidos,
    pedidosPorSucursalYEstado,
    obtenerPedidoPorId,
    crearPedido,
    cambiarEstadoPedido
};