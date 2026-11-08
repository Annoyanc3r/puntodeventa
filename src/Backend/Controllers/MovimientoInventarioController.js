const MovimientoInventario = require('../Models/MovimientoInventario');

// Listar movimientos
const listarMovimientos = async (req, res) => {
    try {
        const movimientos = await MovimientoInventario.find()
            .populate('inventario')
            .populate('empleado', 'nombre');
        res.json(movimientos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Movimientos por inventario
const movimientosPorInventario = async (req, res) => {
    try {
        const movimientos = await MovimientoInventario.find({ inventario: req.params.inventarioId })
            .sort({ createdAt: -1 });
        res.json(movimientos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear movimiento
const crearMovimiento = async (req, res) => {
    try {
        const nuevo = await MovimientoInventario.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    listarMovimientos,
    movimientosPorInventario,
    crearMovimiento
};