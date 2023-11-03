const express = require('express');
const router = express.Router();
const salasController = require('../controllers/salasController');

//Configuración de middleware para manejar datos de formulario y JSON
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

//Manejo de la ruta principal ('/') con un controlador
//router.get('/', salasController.view);

module.exports = router;