const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;


// Configurando o banco de dados SQLite
const db = new sqlite3.Database('respostas.db');
db.serialize(() => {
  db.run("CREATE TABLE respostas (id INTEGER PRIMARY KEY AUTOINCREMENT, pergunta_id INTEGER, resposta TEXT)");

  // Endpoint para receber e salvar as respostas
  app.post('/respostas', (req, res) => {
    const { perguntaId, resposta } = req.body;
    db.run("INSERT INTO respostas (pergunta_id, resposta) VALUES (?, ?)", [perguntaId, resposta], function(err) {
      if (err) {
        res.status(500).json({ message: 'Erro ao salvar a resposta' });
      } else {
        res.status(200).json({ message: 'Resposta salva com sucesso', id: this.lastID });
      }
    });
  });
});

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
