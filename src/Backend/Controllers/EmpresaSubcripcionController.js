const EmpresaSubscripcion = require ('../Models/EmpresaSubscripcion');
const Subscripcion= require ('../Models/Subscripcion');
const Empresa = require ('../Models/Empresa');
const EmpresaUsuario = require ('../Models/EmpresaUsuario');
const jwt = require ('jsonwebtoken');

// Listar relaciones Empresa-Subscripción
const listarEmpresaSubcripciones = async (req, res) => {
    try {
        const relaciones = await EmpresaSubscripcion.find()
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
        const relacion = await EmpresaSubscripcion.findOne({ 
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
        const { plan, precio } = req.body;

        // 1. Identificar la empresa del usuario autenticado mediante el token
        let empresaId = null;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const relacionUsuarioEmpresa = await EmpresaUsuario.findOne({ usuario: decoded.id });
                if (relacionUsuarioEmpresa) {
                    empresaId = relacionUsuarioEmpresa.empresa;
                }
            } catch (err) {
                console.error('Error al verificar token:', err);
            }
        }

        // Si no se encuentra por token, usar la empresa más reciente como respaldo
        if (!empresaId) {
            const empresaDefault = await Empresa.findOne().sort({ createdAt: -1 });
            if (empresaDefault) {
                empresaId = empresaDefault._id;
            } else {
                return res.status(400).json({ error: 'No se encontró ninguna empresa registrada.' });
            }
        }

        // 2. Buscar o crear el documento de la Subscripción
        let subscripcionObj = await Subscripcion.findOne({ nombre: plan });
        if (!subscripcionObj) {
            let duracionDias = 30;
            if (plan && plan.includes('7 días')) duracionDias = 7;
            else if (plan && plan.includes('1 Año')) duracionDias = 365;
            else if (plan && plan.includes('3 Años')) duracionDias = 1095;

            subscripcionObj = await Subscripcion.create({
                nombre: plan || 'Plan Seleccionado',
                precio: Number(precio) || 0,
                duracionDias: duracionDias,
                activo: true
            });
        }

        // 3. Calcular fechas
        const fechaInicio = new Date();
        const fechaFin = new Date();
        const dias = subscripcionObj.duracionDias || 30;
        fechaFin.setDate(fechaFin.getDate() + dias);

        // 4. Desactivar suscripciones anteriores activas
        await EmpresaSubscripcion.updateMany(
            { empresa: empresaId, estado: 'activa' },
            { estado: 'inactiva' }
        );

        // 5. Crear la nueva relación
        const nuevaRelacion = await EmpresaSubscripcion.create({
            empresa: empresaId,
            subscripcion: subscripcionObj._id,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            estado: 'activa'
        });

        res.status(201).json(nuevaRelacion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Modificar estado o fechas de subscripción
const modificarEmpresaSubcripcion = async (req, res) => {
    try {
        const actualizada = await EmpresaSubscripcion.findByIdAndUpdate(
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