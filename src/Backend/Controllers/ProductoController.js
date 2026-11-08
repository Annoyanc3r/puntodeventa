const Producto = require('../Models/Producto');

// Listar productos activos
const listarProductos = async (req, res) => {
    try {
        const productos = await Producto.find({ activo: true }).populate('categoria', 'nombre');
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Productos por categoría
const productosPorCategoria = async (req, res) => {
    try {
        const productos = await Producto.find({ categoria: req.params.categoriaId, activo: true });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener producto por ID
const obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).populate('categoria', 'nombre');
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear producto
const crearProducto = async (req, res) => {
    try {
        const nuevo = await Producto.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Modificar producto
const modificarProducto = async (req, res) => {
    try {
        const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!actualizado) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Baja lógica de producto
const desactivarProducto = async (req, res) => {
    try {
        const desactivado = await Producto.findByIdAndUpdate(req.params.id, { activo: false }, { new: true });
        if (!desactivado) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ mensaje: 'Producto desactivado', producto: desactivado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    listarProductos,
    productosPorCategoria,
    obtenerProductoPorId,
    crearProducto,
    modificarProducto,
    desactivarProducto
};