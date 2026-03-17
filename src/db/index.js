const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cmaia123",
  database: "curso_programacao",
});

db.connect((err) => {
  if (err) {
    console.log("Error ao se conectar com o banco")
  } else {
    console.log("Conexão estabelecida com sucesso")
  }
})


module.exports = db