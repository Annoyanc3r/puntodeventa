//const Usuario = require('../Models/Usuarios');
//const bcrypt = require('bcryptjs');


const Usuario = require ('../Models/Usuarios');
const Empresa = require ('../Models/Empresa');
const EmpresaUsuario = require ('../Models/EmpresaUsuario');
const EmpresaSubscripcion = require ('../Models/EmpresaSubscripcion');
const Subscripcion = require ('../Models/Subscripcion');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');

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
/*const crearUsuario = async (req, res) => {
    try {
        const NuevoUsuario = await Usuario.create(req.body);
        res.status(201).json(NuevoUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
*/

//crear un usuario con una empresa para la suscripcion

const crearUsuario=async(req, res)=>
    {
        try
        {
            const NuevoUsuario = await Usuario.create(req.body);
            const nuevaEmpresa = await Empresa.create({nombre: req.body.nombreEmpresa || `Negocio de ${NuevoUsuario.nombre}`,});
            await EmpresaUsuario.create
            ({
                empresa:nuevaEmpresa._id,
                usuario:NuevoUsuario._id,
                rol:NuevoUsuario.rol||'admin'
            });

            let planPrueba=await Subscripcion.findOne({precio:50});
            if(!planPrueba)
                {
                    planPrueba=await Subscripcion.create
                    ({
                        nombre: '7 dias gratis',
                        precio: 50,
                        activo: true,
                        duracionDias:7
                    });
                }

            const fechaInicio = new Date();
            const fechaFin = new Date();
            fechaFin.setDate(fechaFin.getDate()+7);

            await EmpresaSubscripcion.create
            ({
                empresa: nuevaEmpresa._id,
                subscripcion: planPrueba._id,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                estado: 'activa'
            });

            res.status(201).json
            ({
                usuario:NuevoUsuario,
                empresa:nuevaEmpresa
            });
        } catch(error){res.status(400).json({error: error.message})};
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

const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validar que vengan los datos
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email y contraseña son obligatorios' });
    }

    // 2. Buscar usuario por email (OJO: por defecto select('-password')
    //    en otros endpoints, aquí SÍ lo necesitamos)
    const usuario = await Usuario.findOne({ email: email.toLowerCase() });
    if (!usuario) {
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }

    // 3. Comparar contraseña
    const passwordOk = await bcrypt.compare(password, usuario.password);
    if (!passwordOk) {
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }

    // 4. Generar token
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      usuario: {
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  loginUsuario, // ← nuevo
};