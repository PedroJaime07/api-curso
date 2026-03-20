const express = require('express')
const router = express.Router()
const controller = require('../controllers/videosControllers')

router.post('/', controller.postVideos)
router.get('/', controller.getVideos)
router.get('/curso/:cursoId', controller.getVideosByCurso)
router.get("/videos/:id", controller.getVideoById);
router.put('/videos/:id', controller.updateVideo);

module.exports = router
