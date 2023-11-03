const controller = {};
const path = require('path');
const bcrypt = require('bcrypt');

controller.view = async (req, res)=>{
    if(req.session.loggedin != true){
        res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
    }else{
        res.redirect('/index');
    }
};

controller.post = async (req, res) =>{
    console.log("controller.post funcionando");

    let Exito;
    let contrasena = req.body.contrasena;
    let msg;

    if(req.body.usuario == '' || req.body.usuario === undefined){
        Exito = false;
        msg = "Usuario vacio";
        console.error(msg);
        res.json({Exito : Exito, msg : msg});
    }else{
        req.getConnection((error, conexion)=>{
            console.log("conexion");
            if(error){
                Exito = false;
                msg = "Ocurrio un error en la conexion";
                console.error(msg);
                res.json({Exito: Exito, msg : msg});
            }else{
                console.log("Entre a conexion");
                conexion.query('SELECT * FROM usuarios WHERE usuario = ?', [req.body.usuario], (error, filas) => {
                    console.log(filas);
                    if(filas.length == 0){
                        Exito = false;
                        msg = "No se encontro el correo";
                        console.error(msg);
                        res.json({Exito : Exito, msg : msg});
                    }else{
                        if(error){
                            Exito = false;
                            msg = error.code;
                            console.error(msg);
                            res.json({Exito : Exito, msg : msg});
                        }else{
                            filas.forEach(elemento => {
                                console.log(elemento);
                                bcrypt.compare(req.body.contrasena, elemento.contrasena, (error, coinciden)=>{
                                    if(error){
                                        Exito = false;
                                        msg = "Ha ocurrido un error inesperado";
                                        console.error(msg);
                                        res.json({Exito : Exito, msg : msg});
                                    }else{
                                        if(coinciden == true){
                                            msg = "Iniciando Sesión";
                                            Exito = true;
                                            req.session.loggedin = true;
                                            req.session.usuario = elemento.usuario;
                                            req.session.contrasena = elemento.contrasena;
                                            res.json({Exito : Exito, msg : msg, usuario: req.body.usuario, contrasena: contrasena});
                                        }else{
                                            msg = "Usuario incorrecto";
                                            Exito = false;
                                            res.json({Exito : Exito, msg : msg});
                                        }
                                    }
                                })
                            });
                        }
                    }
                });
            }
        })
    }
}

module.exports = controller;