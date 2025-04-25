/*
    Ruta: /api/all/:search
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getAll, getDocumentsByCollection } = require('../controllers/searchs');

const router = Router();

// Obtener todos los resultados de la busqueda
router.get('/:search', validateJWT, getAll);

// Obtener todos los resultados de la busqueda por coleccion
router.get('/collection/:table/:search', validateJWT, getDocumentsByCollection);

module.exports = router;
