// src/routes/usuarioRoutes.js
const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.post('/usuarios', usuarioController.create);
router.get('/usuarios', usuarioController.getAll);
router.get('/usuarios/:id', usuarioController.getById);
router.put('/usuarios/:id', usuarioController.update);
router.delete('/usuarios/:id', usuarioController.delete);
router.post('/login', usuarioController.login);

module.exports = router;
