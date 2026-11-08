const express = require('express');
const router = express.Router();
const {
    listarSubscripciones,
    obtenerSubscripcionPorId,
    crearSubscripcion,
    modificarSubscripcion,
    desactivarSubscripcion
} = require('../Controllers/SuscripcionController');

router.get('/', listarSubscripciones);
router.get('/:id', obtenerSubscripcionPorId);
router.post('/', crearSubscripcion);
router.put('/:id', modificarSubscripcion);
router.delete('/:id', desactivarSubscripcion);

module.exports = router;