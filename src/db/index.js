require("dotenv").config();
const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect((err) => {
  if (err) {
    console.log("Error ao se conectar com o banco");
  } else {
    console.log("Conexão estabelecida com sucesso");
  }
});

module.exports = client;
