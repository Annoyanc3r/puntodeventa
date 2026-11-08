const EmpresaUsuario = require('../Models/EmpresaUsuario');

// Obtiene todos los usuarios y las empresas que están ligadas
const listarEmpresaUsuarios = async (req, res) => {
    try {
        const relaciones = await EmpresaUsuario.find()
            .populate('empresa', 'nombre rfc')
            .populate('usuario', 'nombre email rol');
        res.json(relaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Regresa un usuario y empresa en específico
const obtenerEmpresaUsuarioPorId = async (req, res) => {
    try {
        const relacion = await EmpresaUsuario.findById(req.params.id)
            .populate('empresa', 'nombre rfc')
            .populate('usuario', 'nombre email rol');
        
        if (!relacion) return res.status(404).json({ error: 'Relación no encontrada' });
        res.json(relacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crea una empresa y usuario
const crearEmpresaUsuario = async (req, res) => {
    try {
        const nuevaRelacion = await EmpresaUsuario.create(req.body);
        res.status(201).json(nuevaRelacion);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                error: 'Este usuario ya está asignado a esta empresa.'
            });
        }
        res.status(400).json({ error: error.message });
    }
};

// Modifica solamente el rol de usuario dentro de la empresa
const actualizarEmpresaUsuario = async (req, res) => {
    try {
        const actualizada = await EmpresaUsuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!actualizada) {
            return res.status(404).json({ error: 'Relación no encontrada' });
        }
        res.json(actualizada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Baja lógica dentro de los usuarios
const eliminarEmpresaUsuario = async (req, res) => {
    try {
        const eliminada = await EmpresaUsuario.findByIdAndDelete(req.params.id);
        if (!eliminada) {
            return res.status(404).json({ error: 'Relación no encontrada' });
        }
        res.json({ mensaje: 'Usuario removido de la empresa correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    listarEmpresaUsuarios,
    obtenerEmpresaUsuarioPorId,
    crearEmpresaUsuario,
    actualizarEmpresaUsuario,
    eliminarEmpresaUsuario
};