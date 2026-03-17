const express = require("express");
const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json());

app.use('/cursos', require('./src/routes/cursos'))
app.use('/videos', require('./src/routes/videos'))


module.exports = app
