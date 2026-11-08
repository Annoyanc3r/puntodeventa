const MenuPOS = require('../Models/MenuPOS');

// Listar menú por sucursal
const listarMenuPorSucursal = async (req, res) => {
    try {
        const menu = await MenuPOS.find({ sucursal: req.params.sucursalId, visible: true })
            .populate('producto', 'nombre precioBase imagen')
            .sort({ orden: 1 });
        res.json(menu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear elemento de menú
const crearMenuPos = async (req, res) => {
    try {
        const nuevo = await MenuPOS.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Modificar elemento de menú
const modificarMenuPos = async (req, res) => {
    try {
        const actualizado = await MenuPOS.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!actualizado) return res.status(404).json({ error: 'Elemento de menú no encontrado' });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar elemento de menú
const eliminarMenuPos = async (req, res) => {
    try {
        const eliminado = await MenuPOS.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ error: 'Elemento de menú no encontrado' });
        res.json({ mensaje: 'Elemento eliminado del menú' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    listarMenuPorSucursal,
    crearMenuPos,
    modificarMenuPos,
    eliminarMenuPos
};