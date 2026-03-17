const db = require('../db/index')

exports.postCursos = (req, res) => {
  const { titulo, descricao, thumbnail, categoria } = req.body;
  const sql = `
        INSERT INTO cursos (titulo, descricao, thumbnail, categoria) VALUES (?,?,?,?)
    `;

  db.query(sql, [titulo, descricao, thumbnail, categoria], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      res.status(201).json({ mensagem: "Curso adicionado com sucesso" });
    }
  });
}

exports.getCursos = (req, res) => {
  const sql = "SELECT * FROM cursos";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
}


exports.deleteCursos = (req, res) => {
  const {id} = req.params
  const sql = `DELETE FROM cursos WHERE id = ?`

  db.query(sql, [id], (err, results) => {
    if(err) {
      return res.status(500).send(err)
    } else {
      res.status(200).json({mensagem: 'Curso excluído com sucesso'})
    }
  })
}