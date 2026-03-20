const db = require("../db/index");

exports.postVideos = (req, res) => {
  const { titulo, descricao, youtube_id, duracao, ordem, curso_id } = req.body;
  const sql = `
        INSERT INTO videos (titulo, descricao, youtube_id, duracao, ordem, curso_id) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;
  db.query(
    sql,
    [titulo, descricao, youtube_id, duracao, ordem, curso_id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ erro: err.message });
      } else {
        res.status(201).json(results.rows);
      }
    },
  );
};

exports.getVideos = (req, res) => {
  const sql = "SELECT * FROM videos";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      res.json(results.rows);
    }
  });
};

exports.getVideosByCurso = (req, res) => {
  const {cursoId} = req.params

  const sql = "SELECT * FROM videos WHERE curso_id = $1 ORDER BY ordem";

  db.query(sql, [cursoId], (err, results) => {
    if(err) {
      return res.status(500).send(err)
    } else {
      res.json(results.rows)
    }
  })
};

exports.getVideoById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM videos WHERE id = $1";

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Vídeo não encontrado" });
    }

    res.json(results.rows);
  });
};

exports.updateVideo = (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, youtube_id, duracao, ordem, curso_id } = req.body;

  const sql = `
    UPDATE videos 
    SET titulo = $1, 
        descricao = $2, 
        youtube_id = $3, 
        duracao = $4,
        ordem = $5,
        curso_id = $6
    WHERE id = $7
    RETURNING *
  `;

  db.query(
    sql,
    [titulo, descricao, youtube_id, duracao, ordem, curso_id, id],
    (err, results) => {
      if (err) {
        console.error("ERRO AO ATUALIZAR:", err);
        return res.status(500).json(err);
      }

      if (results.rows.length === 0) {
        return res.status(404).json({ message: "Vídeo não encontrado" });
      }

      res.json(results.rows);
    }
  );
};
