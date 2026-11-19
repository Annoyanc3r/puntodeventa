const Categoria = require('../Models/Categoria');
const { obtenerContextoUsuario } = require('../Utils/empresaScope');

// Listar categorías activas (filtradas por empresa del usuario si aplica)
const listarCategorias = async (req, res) => {
    try {
        const { empresaId } = await obtenerContextoUsuario(req);
        const filtro = empresaId
            ? { activo: true, empresa: empresaId }
            : { activo: true, $or: [{ empresa: { $exists: false } }, { empresa: null }] };
        const categorias = await Categoria.find(filtro);
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
        const { empresaId } = await obtenerContextoUsuario(req);
        const payload = { ...req.body };
        if (empresaId && !payload.empresa) {
            payload.empresa = empresaId;
        }
        const nueva = await Categoria.create(payload);
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