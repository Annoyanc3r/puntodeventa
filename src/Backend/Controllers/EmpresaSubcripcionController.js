const EmpresaSubcripcion = require('../Models/EmpresaSubscripcion');

// Listar relaciones Empresa-Subscripción
const listarEmpresaSubcripciones = async (req, res) => {
    try {
        const relaciones = await EmpresaSubcripcion.find()
            .populate('empresa', 'nombre')
            .populate('subscripcion', 'nombre precio');
        res.json(relaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Subscripción activa por empresa
const subscripcionActivaPorEmpresa = async (req, res) => {
    try {
        const relacion = await EmpresaSubcripcion.findOne({ 
            empresa: req.params.empresaId, 
            estado: 'activa' 
        }).populate('subscripcion', 'nombre precio caracteristicas');
        
        if (!relacion) return res.status(404).json({ error: 'La empresa no tiene subscripción activa' });
        res.json(relacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear relación Empresa-Subscripción
const crearEmpresaSubcripcion = async (req, res) => {
    try {
        const nueva = await EmpresaSubcripcion.create(req.body);
        res.status(201).json(nueva);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Modificar estado o fechas de subscripción
const modificarEmpresaSubcripcion = async (req, res) => {
    try {
        const actualizada = await EmpresaSubcripcion.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!actualizada) return res.status(404).json({ error: 'Relación no encontrada' });
        res.json(actualizada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    listarEmpresaSubcripciones,
    subscripcionActivaPorEmpresa,
    crearEmpresaSubcripcion,
    modificarEmpresaSubcripcion
};