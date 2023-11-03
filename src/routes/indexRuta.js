const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/', indexController.view);

module.exports = router;