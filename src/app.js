require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', usuarioRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`);
});
