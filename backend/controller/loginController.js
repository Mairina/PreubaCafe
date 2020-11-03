const modelLogin = require("../model/model.login")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

class controlerLogin {
    createLogin = async(req, res) => {
        try {

            const login = new modelLogin(req.body)
            login.token = jwt.sign({ userId: login._id }, process.env.SECRET_KEY)
            await login.encryptPassword()
            const savedLogin = await login.save()
            res.status(200).json(savedLogin)

        } catch (error) {
            console.log(error.message)
            res.status(400).json(error)
        }
    }
    login = async(req, res) => {
        try {
            const [users] = await modelLogin.find({ mail: req.body.mail })
            const validate = await bcrypt.compare(req.body.password, users.password)
            if (validate) {
                res.status(200).json(users)
            } else {
                res.status(200).json("Error en password")
            }
        } catch (error) {
            res.status(400, json(error.menssage))
        }




    }
}

const controllerLogin = new controlerLogin()
module.exports = controllerLogin