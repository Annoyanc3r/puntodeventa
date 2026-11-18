const mongoose = require('mongoose');
const Sucursal = require('../Models/Sucursal');
const EmpresaUsuario = require('../Models/EmpresaUsuario');
const Empresa = require('../Models/Empresa');

// Regresa todas las sucursales
const listarSucursales = async (req, res) => {
    try {
        const sucursales = await Sucursal.find()
            .populate('empresa', 'nombre rfc');
        res.json(sucursales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Traer sucursales de una empresa específica
const sucursalesPorEmpresa = async (req, res) => {
    try {
        const sucursales = await Sucursal.find({
            empresa: req.params.empresaId,
            activo: true
        });
        res.json(sucursales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una sucursal en específico
const obtenerSucursalPorId = async (req, res) => {
    try {
        const sucursal = await Sucursal.findById(req.params.id)
            .populate('empresa', 'nombre rfc');
        if (!sucursal) {
            return res.status(404).json({ error: 'Sucursal no encontrada' });
        }
        res.json(sucursal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear sucursal
const crearSucursal = async (req, res) => {
    try {
        const nueva = await Sucursal.create(req.body);
        res.status(201).json(nueva);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Modificar sucursal
const modificarSucursal = async (req, res) => {
    try {
        const actualizada = await Sucursal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!actualizada) {
            return res.status(404).json({ error: 'Sucursal no existe' });
        }
        res.json(actualizada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Baja lógica de sucursal
const desactivarSucursal = async (req, res) => {
    try {
        const desactivada = await Sucursal.findByIdAndUpdate(
            req.params.id,
            { activo: false },
            { new: true }
        );
        if (!desactivada) {
            return res.status(404).json({ error: 'Esta sucursal no existe' });
        }
        res.json({ mensaje: 'Sucursal desactivada correctamente', sucursal: desactivada });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const crearSucursalDesdeUsuario = async (req, res) => {
  try {
    const { ID_usuario, nombre, num, direccion, datos, masDatos } = req.body;

    // --- Validaciones básicas ---
    if (!ID_usuario) {
      return res.status(400).json({ msg: 'ID_usuario es requerido' });
    }
    if (!mongoose.Types.ObjectId.isValid(ID_usuario)) {
      return res.status(400).json({ msg: 'ID_usuario inválido' });
    }
    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ msg: 'El nombre de la sucursal es requerido' });
    }

    // --- 1) Buscar la relación usuario ↔ empresa ---
    // NO usamos populate aquí: solo necesitamos el ObjectId de empresa.
    const relacion = await EmpresaUsuario.findOne({ usuario: ID_usuario });

    if (!relacion) {
      return res.status(404).json({
        msg: 'El usuario no está asociado a ninguna empresa (EmpresaUsuario).',
      });
    }
    if (!relacion.empresa) {
      return res.status(404).json({
        msg: 'La relación EmpresaUsuario no tiene empresa asignada.',
      });
    }

    // relacion.empresa ya es un ObjectId válido (campo requerido del schema)
    const empresaId = relacion.empresa;

    // --- 2) Mapear frontend → modelo (sin inventar campos) ---
    const nombreFinal = num ? `${nombre.trim()} (#${String(num).trim()})` : nombre.trim();

    const direccionFinal = masDatos
      ? `${(direccion || '').trim()} — ${String(masDatos).trim()}`
      : (direccion || '').trim();

    const telefonoFinal = datos
      ? String(datos).replace(/^Tel:\s*/i, '').trim() || undefined
      : undefined;

    // --- 3) Crear la sucursal ---
    const nuevaSucursal = new Sucursal({
      empresa: empresaId,          // ✅ ObjectId garantizado
      nombre: nombreFinal,
      direccion: direccionFinal || undefined,
      telefono: telefonoFinal,
      activo: true,
    });

    await nuevaSucursal.save();

    return res.status(201).json({
      msg: 'Sucursal creada correctamente',
      sucursal: nuevaSucursal,
      empresaId,
    });
  } catch (error) {
    console.error('Error al crear sucursal:', error);
    return res.status(500).json({
      msg: 'Error al crear la sucursal',
      error: error.message,
    });
  }
};

const obtenerSucursalesPorUsuario = async (req, res) => {
  try {
    const { ID_usuario } = req.params;

    if (!ID_usuario) {
      return res.status(400).json({ msg: 'ID_usuario es requerido' });
    }
    if (!mongoose.Types.ObjectId.isValid(ID_usuario)) {
      return res.status(400).json({ msg: 'ID_usuario inválido' });
    }

    // 1) Resolver la empresa del usuario (y de paso verificar pertenencia)
    const relacion = await EmpresaUsuario.findOne({ usuario: ID_usuario });

   
    if (!relacion) {
      return res.status(404).json({
        msg: 'El usuario no está asociado a ninguna empresa (EmpresaUsuario).',
      });
    }
    if (!relacion.empresa) {
      return res.status(404).json({
        msg: 'La relación EmpresaUsuario no tiene empresa asignada.',
      });
    }

    // 2) Traer todas las sucursales de esa empresa
    const sucursales = await Sucursal
      .find({ empresa: relacion.empresa })
      .sort({ createdAt: -1 }); // más recientes primero

    return res.status(200).json({
      total: sucursales.length,
      empresaId: relacion.empresa,
      sucursales,
    });
  } catch (error) {
    console.error('Error al obtener sucursales:', error);
    return res.status(500).json({
      msg: 'Error al obtener las sucursales',
      error: error.message,
    });
  }
};


module.exports = {
    listarSucursales,
    sucursalesPorEmpresa,
    obtenerSucursalPorId,
    crearSucursal,
    modificarSucursal,
    desactivarSucursal,
    crearSucursalDesdeUsuario,
    obtenerSucursalesPorUsuario
};