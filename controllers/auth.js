const { response } = require('express');
const bcrypt = require("bcryptjs");
const { generateJWT } = require('../helpers/jwt');

// Model
const User = require('../models/user');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar email
        const userDB = await User.findOne({ email });

        if(!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar password
        const validPassword = bcrypt.compareSync( password, userDB.password );

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no valido'
            });
        }

        // Generar el token - JWT
        const token = await generateJWT( userDB.id );

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

// const generateJWT = async (req, res = response) => {

// }

module.exports = {
    login
}
