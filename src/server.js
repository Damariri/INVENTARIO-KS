const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();


const dbOptions = {
    host: 'localhost',
    database: 'inventarioks',
    user: 'root',
    password: '',
    port: '3306',
}


//Conexion a la Base de Datos
const conexion = mysql.createConnection(dbOptions);

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
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

// Importación de módulos de rutas
const usuarioRuta = require('./routes/usuariosRuta');
  
// Configuración de las rutas en la aplicación Express
app.use('/login', usuarioRuta)

module.exports = app;