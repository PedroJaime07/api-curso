const express = require("express");
const router = express.Router()
const controller = require('../controllers/cursosControllers')

router.post('/', controller.postCursos)
router.get('/', controller.getCursos)
router.get('/:id', controller.getCursoById);
router.delete('/:id', controller.deleteCursos)

module.exports = router
