/*
    Ruta: /api/upload/:collection/:id
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { uploadFile, getImage } = require('../controllers/uploads');
const fileUpload = require("express-fileupload");


const router = Router();

router.use( fileUpload() );   // Middleware para manejar la subida de archivos

// Subir archivo a una coleccion
router.put('/:collection/:id', validateJWT, uploadFile);
router.get('/:collection/:image', getImage); // Para obtener la imagen de una coleccion

module.exports = router;