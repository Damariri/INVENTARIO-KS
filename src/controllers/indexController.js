const controller = {};
const path = require('path');

controller.view = (req, res)=>{
    try {
        // Operaciones asíncronas aquí
        res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }

    req.getConnection((error, conexion) => { // PARA REALIZAR CONSUYLKTAS QUERY SOLO DEBES PONER ESTO DENTRO DEL CONTROLADOR
        if (error) {
            msg = "Ha ocurrido un error inesperado en la consulta.";
            console.error(msg);
            reject(msg);
        } else {
            conexion.query('SELECT * FROM pie_sala_sensorial', (error, result) => {
                if (error) {
                    msg = error.code;
                    console.error(msg);
                    reject(msg);
                } else {
                    console.log(result)
                }
            });
        }
    });

};

module.exports = controller; // NO TENIAS PUESTO ESTO