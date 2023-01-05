const express = require('express')
const router = express.Router();
const controller = require("../controller/control")
const authenticationMiddle = require("../middleware/authentication")
const authorizationMiddle = require("../middleware/authorization")

router.post('/authors', controller.createAuthor)
router.post('/blogs', authenticationMiddle.authentication, controller.createBlog)
router.get('/blogs', authenticationMiddle.authentication, controller.getBlog)
router.put('/blogs/:blogId', authenticationMiddle.authentication, authorizationMiddle.authorization, controller.updateBlog)
router.delete('/blogs/:blogId', authenticationMiddle.authentication, authorizationMiddle.authorization, controller.deleteParam)
router.delete('/blogs', authenticationMiddle.authentication, authorizationMiddle.queryAuthorization, controller.deleteQuery)
router.post("/login", controller.login)
module.exports = router