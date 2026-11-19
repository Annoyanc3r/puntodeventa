const Pedido = require('../Models/Pedido');
const Sucursal = require('../Models/Sucursal');
const Empleado = require('../Models/Empleado');
const { obtenerContextoUsuario } = require('../Utils/empresaScope');

// Listar pedidos (filtrados por sucursales de la empresa del usuario si aplica)
const listarPedidos = async (req, res) => {
    try {
        const { empresaId, sucursalIds } = await obtenerContextoUsuario(req);
        const filtro = {};
        if (empresaId) {
            filtro.sucursal = { $in: sucursalIds };
        }
        const pedidos = await Pedido.find(filtro)
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

// Crear pedido (con respaldo para sucursal y empleado si no vienen explícitos)
const crearPedido = async (req, res) => {
    try {
        const { empresaId, sucursalIds } = await obtenerContextoUsuario(req);

        let sucursalId = req.body.sucursal;
        if (!sucursalId) {
            if (empresaId && sucursalIds.length > 0) {
                sucursalId = sucursalIds[0];
            } else {
                const sucDefault = await Sucursal.findOne({ activo: true });
                if (!sucDefault) {
                    return res.status(400).json({ error: 'No hay sucursal activa registrada para crear el pedido.' });
                }
                sucursalId = sucDefault._id;
            }
        }

        let empleadoId = req.body.empleado;
        if (!empleadoId) {
            let empDefault = await Empleado.findOne({ sucursal: sucursalId }) || await Empleado.findOne();
            if (!empDefault) {
                empDefault = await Empleado.create({
                    nombre: 'Cajero POS',
                    sucursal: sucursalId,
                    puesto: 'Cajero',
                    activo: true
                });
            }
            empleadoId = empDefault._id;
        }

        const nuevo = await Pedido.create({
            ...req.body,
            sucursal: sucursalId,
            empleado: empleadoId,
            estado: req.body.estado || 'pagado'
        });

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