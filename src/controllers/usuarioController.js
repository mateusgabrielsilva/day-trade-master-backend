// src/controllers/usuarioController.js
const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const usuarioController = {
  async create(req, res) {
    const { Nome, Email, Senha, Ativo } = req.body;
    const existeUsuario = await Usuario.findByEmail(Email);
    if (existeUsuario) {
      return res.status(401).json({ message: 'Email já cadastrado' });
    }
    const hashedSenha = await bcrypt.hash(Senha, 10);
    const usuario = { Nome, Email, Senha: hashedSenha, Ativo };
    const id = await Usuario.create(usuario);
    res.status(201).json({ 
      Id: id,
      Nome,
      Email,
      Ativo
    });
  },
  async getById(req, res) {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  },
  async getAll(req, res) {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  },
  async update(req, res) {
    const { id } = req.params;
    const { Nome, Email, Senha, Ativo } = req.body;
    const hashedSenha = await bcrypt.hash(Senha, 10);
    const usuario = { Nome, Email, Senha: hashedSenha, Ativo };
    await Usuario.update(id, usuario);
    res.json({ message: 'Usuário atualizado com sucesso' });
  },
  async delete(req, res) {
    const { id } = req.params;
    await Usuario.delete(id);
    res.json({ message: 'Usuário deletado com sucesso' });
  },
  async login(req, res) {
    const { Email, Senha } = req.body;
    const usuario = await Usuario.findByEmail(Email);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    const isMatch = await bcrypt.compare(Senha, usuario.Senha);
    if (!isMatch) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }
    const token = jwt.sign({ id: usuario.IdUsuario, email: usuario.Email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ 
        Id: usuario.IdUsuario,
        Nome: usuario.Nome,
        Email: usuario.Email,
        Ativo: usuario.Ativo,
        Token: token
    });
  }
};

module.exports = usuarioController;
