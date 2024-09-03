// usuarioapis.js

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Definir un esquema y modelo de Mongoose
const usuariosSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    edad: Number,
    activo: Boolean
});

const UsuarioModel = mongoose.model('Usuario', usuariosSchema);

// Ruta para crear un nuevo usuario
router.post('/users', async (req, res) => {
    try {
        const newUsuario = new UsuarioModel(req.body);
        const usuarioGuardado = await newUsuario.save();
        res.status(201).send(usuarioGuardado);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Ruta para obtener todos los usuarios
router.get('/users', async (req, res) => {
    try {
        const users = await UsuarioModel.find();
        res.send(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ruta para obtener un usuario por ID
router.get('/users/:id', async (req, res) => {
    try {
        const usuario = await UsuarioModel.findById(req.params.id);
        if (!usuario) return res.status(404).send('El usuario no fue encontrado.');
        res.send(usuario);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ruta para actualizar un usuario por ID
router.put('/users/:id', async (req, res) => {
    try {
        const usuario = await UsuarioModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!usuario) return res.status(404).send('El usuario no fue encontrado.');
        res.send(usuario);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Ruta para eliminar un usuario por ID
router.delete('/users/:id', async (req, res) => {
    try {
        const usuario = await UsuarioModel.findByIdAndDelete(req.params.id);
        if (!usuario) return res.status(404).send('El usuario no fue encontrado.');
        res.send('Usuario eliminado.');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
