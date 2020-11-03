const router = require("express").Router()
const loginControl = require("../controller/loginController")
const { authMiddleware } = require("../utils/middleware")

router.route("/").post(loginControl.createLogin)
router.route("/login").post(authMiddleware, loginControl.login)

module.exports = router