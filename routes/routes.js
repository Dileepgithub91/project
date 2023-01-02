const express = require('express')
const router = express.Router();
const controller = require("../controller/control")

router.post('/authors',controller.createAuthor)
router.post('/blogs',controller.createBlog)
router.get('/blogs',controller.getBlog)
router.put('/blogs/:blogId',controller.updateBlog)
module.exports = router