const Usuario = require('../Models/Usuarios');

// Obtener todos los usuarios
const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-password');
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).select('-password');
        if (!usuario) return res.status(404).json({ msg: 'No encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un usuario
const crearUsuario = async (req, res) => {
    try {
        const NuevoUsuario = await Usuario.create(req.body);
        res.status(201).json(NuevoUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar usuario
const actualizarUsuario = async (req, res) => {
    try {
        const UsuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        ).select('-password');
        res.json(UsuarioActualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar usuario
const eliminarUsuario = async (req, res) => {
    try {
        const usuario_eliminado = await Usuario.findByIdAndDelete(req.params.id);
        res.json({ usuario: usuario_eliminado.nombre, id: usuario_eliminado._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    listarUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};