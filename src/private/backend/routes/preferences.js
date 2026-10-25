const express = require('express');
const router = express.Router();
const Sucursal = require('../models/Sucursal');

// preferencias del POS
router.get('/:sucursalId', async (req, res) => {
  try {
    console.log("Buscando preferencias de la sucursal: " + req.params.sucursalId);
    
    // Buscamos la sucursal en la base de datos
    const sucursal = await Sucursal.findById(req.params.sucursalId);
    
    if (!sucursal) {
      return res.status(404).json({ mensaje: "No se encontró la sucursal" });
    }

    // Mandamos solo lo que necesitamos
    res.json({
      configuracion_pos: sucursal.configuracion_pos,
      menu_pos: sucursal.menu_pos
    });

  } catch (error) {
    console.log("Error al buscar:", error);
    res.status(500).json({ mensaje: "Error del servidor", error: error.message });
  }
});

// colores y estilo de caja del POS
router.put('/:sucursalId/config', async (req, res) => {
  try {
    console.log("Recibiendo datos para guardar:", req.body);

    // 1. Buscamos la sucursal
    const sucursal = await Sucursal.findById(req.params.sucursalId);
    
    if (!sucursal) {
      return res.status(404).json({ mensaje: "Sucursal no encontrada" });
    }

    // actualiza las preferencias del pos si vienen en el body
    if (req.body.color_primario) {
      sucursal.configuracion_pos.color_primario = req.body.color_primario;
    }
    if (req.body.estilo_caja) {
      sucursal.configuracion_pos.estilo_caja = req.body.estilo_caja;
    }
    if (req.body.formato_ticket) {
      sucursal.configuracion_pos.formato_ticket = req.body.formato_ticket;
    }

    // 3. Guardamos los cambios en MongoDB
    await sucursal.save();
    console.log("Preferencias guardadas con éxito");

    res.json({
      mensaje: "Preferencias actualizadas",
      configuracion_pos: sucursal.configuracion_pos
    });

  } catch (error) {
    console.log("Error al guardar:", error);
    res.status(500).json({ mensaje: "Error al guardar", error: error.message });
  }
});

// --- GUARDAR EL MENÚ (Qué productos se ven) ---
router.put('/:sucursalId/menu', async (req, res) => {
  try {
    const sucursal = await Sucursal.findById(req.params.sucursalId);
    
    if (!sucursal) {
      return res.status(404).json({ mensaje: "Sucursal no encontrada" });
    }

    // Recibimos el arreglo del menú y lo asignamos
    sucursal.menu_pos = req.body.menu_pos;
    await sucursal.save();

    res.json({
      mensaje: "Menú actualizado",
      menu_pos: sucursal.menu_pos
    });

  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar menú", error: error.message });
  }
});

module.exports = router;