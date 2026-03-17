const db = require("../db/index");

exports.postVideos = (req, res) => {
  const { titulo, descricao, youtube_id, duracao, ordem, curso_id } = req.body;
  const sql = `
        INSERT INTO videos (titulo, descricao, youtube_id, duracao, ordem, curso_id) VALUES ($1, $2, $3, $4, $5, $6)
    `;
  db.query(
    sql,
    [titulo, descricao, youtube_id, duracao, ordem, curso_id],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.status(201).json({ mensagem: "Video adicionado com sucesso" });
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
      res.json(results);
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
      res.json(results)
    }
  })
};

