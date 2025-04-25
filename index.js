require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config');

// Crear el servidor
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();

// Rutas

// TODO: Revisar ruta raiz 

app.use( '/api/users', require('./routes/users') );
app.use( '/api/hospitals', require('./routes/hospitals') );
app.use( '/api/all', require('./routes/searchs') );
app.use( '/api/doctors', require('./routes/doctors') );
app.use( '/api/uploads', require('./routes/uploads') );
app.use( '/api/login', require('./routes/auth') );


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})