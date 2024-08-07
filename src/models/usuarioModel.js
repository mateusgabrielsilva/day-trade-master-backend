// src/models/usuarioModel.js
const db = require('../config/database');

const Usuario = {
  async create(usuario) {
    const sql = 'INSERT INTO Usuarios (Nome, Email, Senha, Ativo) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(sql, [usuario.Nome, usuario.Email, usuario.Senha, usuario.Ativo]);
    return result.insertId;
  },
  async findById(id) {
    const sql = 'SELECT * FROM Usuarios WHERE IdUsuario = ?';
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  },
  async findByEmail(email) {
    const sql = 'SELECT * FROM Usuarios WHERE Email = ?';
    const [rows] = await db.execute(sql, [email]);
    return rows[0];
  },
  async findAll() {
    const sql = 'SELECT * FROM Usuarios';
    const [rows] = await db.execute(sql);
    return rows;
  },
  async update(id, usuario) {
    const sql = 'UPDATE Usuarios SET Nome = ?, Email = ?, Senha = ?, Ativo = ? WHERE IdUsuario = ?';
    await db.execute(sql, [usuario.Nome, usuario.Email, usuario.Senha, usuario.Ativo, id]);
  },
  async delete(id) {
    const sql = 'DELETE FROM Usuarios WHERE IdUsuario = ?';
    await db.execute(sql, [id]);
  }
};

module.exports = Usuario;
