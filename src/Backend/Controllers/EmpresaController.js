const Empresa = require('../Models/Empresa');

// Listar todas las empresas
const listarEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.find();
        res.json(empresas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Traer una empresa por ID
const obtenerEmpresaPorId = async (req, res) => {
    try {
        const empresa = await Empresa.findById(req.params.id);
        if (!empresa) return res.status(404).json({ msg: 'Esta empresa no existe' });
        res.json(empresa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear una nueva empresa
const crearEmpresa = async (req, res) => {
    try {
        const nueva = await Empresa.create(req.body);
        res.status(201).json(nueva);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar información de una empresa
const actualizarEmpresa = async (req, res) => {
    try {
        const actualizada = await Empresa.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!actualizada) {
            return res.status(404).json({ error: 'Empresa no encontrada' });
        }
        res.json(actualizada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Dar de baja una empresa (desactivar)
const desactivarEmpresa = async (req, res) => {
    try {
        const desactivada = await Empresa.findByIdAndUpdate(
            req.params.id,
            { activo: false },
            { new: true }
        );
        if (!desactivada) {
            return res.status(404).json({ error: 'No se encontro la empresa' });
        }
        res.json({ mensaje: 'Empresa Eliminada', empresa: desactivada });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    listarEmpresas,
    obtenerEmpresaPorId,
    crearEmpresa,
    actualizarEmpresa,
    desactivarEmpresa
};