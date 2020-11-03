const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")
const loginSchema = new Schema({
    name: {
        type: String,
        default: "no name"
    },
    mail: {
        type: String,
        require: true,
        default: "enter correo",
        unique: true
    },
    password: {
        type: String,
        required: true
    },
            
    token: {
        type: [{type: String}],
        required: true
    }
}, {
    timestamps: true
})

loginSchema.methods.encryptPassword = async function () {
    this.password = await bcrypt.hash(this.password, 8)
}

loginSchema.methods.comparePassword = async function () {
    this.password = await bcrypt.hash(this.password, 8)
}

const login = new model("loginNetflix", loginSchema)
module.exports = login