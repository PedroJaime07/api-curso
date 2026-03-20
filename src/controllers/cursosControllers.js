const db = require('../db/index')

exports.postCursos = (req, res) => {
  const { titulo, descricao, thumbnail, categoria } = req.body;
  const sql = `
        INSERT INTO cursos (titulo, descricao, thumbnail, categoria) VALUES ($1, $2, $3, $4) RETURNING *
    `;

  db.query(sql, [titulo, descricao, thumbnail, categoria], (err, results) => {
    if (err) {
      console.error("ERRO REAL DO BANCO:", err);
      return res.status(500).send(err);
    } else {
      res.status(201).json(results.rows[0]);
    }
  });
}

exports.getCursos = (req, res) => {
  const sql = "SELECT * FROM cursos";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      res.json(results.rows);
    }
  });
}

exports.getCursoById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM cursos WHERE id = $1";
  
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Curso não encontrado" });
    }

    res.json(results.rows[0]);
  });
};

exports.updateCurso = (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, thumbnail, categoria } = req.body;

  const sql = `
    UPDATE cursos
    SET titulo = $1,
        descricao = $2,
        thumbnail = $3,
        categoria = $4
    WHERE id = $5
    RETURNING *
  `;

  db.query(sql, [titulo, descricao, thumbnail, categoria, id], (err, results) => {
    if (err) {
      console.error("ERRO AO ATUALIZAR:", err);
      return res.status(500).send(err);
    }

    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Curso não encontrado" });
    }

    res.status(200).json(results.rows[0]);
  });
};

exports.deleteCursos = (req, res) => {
  const {id} = req.params
  const sql = `DELETE FROM cursos WHERE id = $1`

  db.query(sql, [id], (err, results) => {
    if(err) {
      return res.status(500).send(err)
    } else {
      res.status(200).json({mensagem: 'Curso excluído com sucesso'})
    }
  })
}
