/*
    Ruta: /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');

const router = Router();

// Obtener todos los usuarios
router.get( '/', validateJWT, getUsers);

// Crear un nuevo usuario
router.post( '/', 
    [
        check('name', 'The name is required').not().isEmpty(),
        check('password', 'The password is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        validateFields
    ],
    createUser);

// Actualizar un usuario
router.put('/:id',
    [
        validateJWT,
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('role', 'The role is required').not().isEmpty(),
        validateFields
    ],
    updateUser);

// Borrar un usuario
router.delete('/:id', validateJWT, deleteUser);

module.exports = router;