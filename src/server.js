const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
const myConnection = require('express-myconnection'); // añadido FUKA


const dbOptions = {
    host: 'localhost',
    database: 'inventarioks',
    user: 'root',
    password: '',
    port: '3307', //  // añadido FUKA CAMBIA TU PUERTO AL CORRESPONDIENTE, EN MI CASO ES EL 3307. ESTABA PUESTO EN 3306 EL TUYO
}


//Conexion a la Base de Datos
app.use(myConnection(mysql, dbOptions, 'single')); // añadido FUKA SE DECLARA LA BASE DE DATOS UNA SOLA VEZ EN TODO EL PROYECTO Y SE LLAMA COMO LO HICE EN INDEXCONTROLLER


/*const conexion = mysql.createConnection(dbOptions);

conexion.connect(function(err){
    if(err){
        console.error('Error de conexión a la base de datos:', err);
        process.exit(1);
    }else{
        console.log("conexion exitosa")
    }
})

conexion.query('SELECT * from usuarios', function(error,results,fields){
    if(error)
    throw error;

    results.forEach(result =>{
        console.log(result);
    })
})
*/


//configuracion
app.set('port', process.env.PORT || 3000);

app.use(express.static('public', {
    maxAge: 31536000, // Cache for 1 year
  }));

//comenzar servidor
app.listen(app.get('port'), () =>{
    console.log('server encendido en puerto ', app.get('port'));
    
})

//indicar donde estan las views
app.set('views', path.join(__dirname,'views'));

//middleware

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html')) // DEBERÍA SER A LOGIN.HTML
})

// Importación de módulos de rutas
const usuarioRuta = require('./routes/usuariosRuta');
const indexRuta = require('./routes/indexRuta'); // AGREGUE EL /INDEX
  
// Configuración de las rutas en la aplicación Express
app.use('/login', usuarioRuta)
app.use('/index', indexRuta)

module.exports = app;