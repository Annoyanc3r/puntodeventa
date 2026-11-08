const Inventario = require('../Models/Inventario');

// Listar todo el inventario
const listarInventario = async (req, res) => {
    try {
        const inventario = await Inventario.find()
            .populate('sucursal', 'nombre')
            .populate('producto', 'nombre precioBase');
        res.json(inventario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Inventario por sucursal
const inventarioPorSucursal = async (req, res) => {
    try {
        const inventario = await Inventario.find({ sucursal: req.params.sucursalId })
            .populate('producto', 'nombre precioBase imagen');
        res.json(inventario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener inventario por ID
const obtenerInventarioPorId = async (req, res) => {
    try {
        const item = await Inventario.findById(req.params.id)
            .populate('sucursal', 'nombre')
            .populate('producto', 'nombre');
        if (!item) return res.status(404).json({ error: 'Inventario no encontrado' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear inventario
const crearInventario = async (req, res) => {
    try {
        const nuevo = await Inventario.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'El producto ya existe en esta sucursal' });
        }
        res.status(400).json({ error: error.message });
    }
};

// Modificar inventario
const modificarInventario = async (req, res) => {
    try {
        const actualizado = await Inventario.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!actualizado) return res.status(404).json({ error: 'Inventario no encontrado' });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar inventario
const eliminarInventario = async (req, res) => {
    try {
        const eliminado = await Inventario.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ error: 'Inventario no encontrado' });
        res.json({ mensaje: 'Producto eliminado del inventario' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    listarInventario,
    inventarioPorSucursal,
    obtenerInventarioPorId,
    crearInventario,
    modificarInventario,
    eliminarInventario
};