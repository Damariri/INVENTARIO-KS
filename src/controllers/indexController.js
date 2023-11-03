const controller = {};
const path = require('path');

controller.view = (req, res)=>{
    try {
        // Operaciones asíncronas aquí
        res.sendFile(path.join(__dirname, '..', 'view', 'index.html'));
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};