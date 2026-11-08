const Categoria = require('../Models/Categoria');

// Listar categorías activas
const listarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find({ activo: true });
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener categoría por ID
const obtenerCategoriaPorId = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear categoría
const crearCategoria = async (req, res) => {
    try {
        const nueva = await Categoria.create(req.body);
        res.status(201).json(nueva);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Modificar categoría
const modificarCategoria = async (req, res) => {
    try {
        const actualizada = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!actualizada) return res.status(404).json({ error: 'Categoría no encontrada' });
        res.json(actualizada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Baja lógica de categoría
const desactivarCategoria = async (req, res) => {
    try {
        const desactivada = await Categoria.findByIdAndUpdate(req.params.id, { activo: false }, { new: true });
        if (!desactivada) return res.status(404).json({ error: 'Categoría no encontrada' });
        res.json({ mensaje: 'Categoría desactivada', categoria: desactivada });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    listarCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    modificarCategoria,
    desactivarCategoria
};