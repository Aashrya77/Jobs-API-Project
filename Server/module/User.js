require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide username'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            ,
            "Please provide valid email",
          ],
          unique: true,
    },
    password: { 
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 8,
    }
}, {timestamps: true})


UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

UserSchema.methods.createJWT = function (){
    return jwt.sign({userId: this._id, name: this.username}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

UserSchema.methods.comparePassword = async function (orgPassword){
    const isCorrect = await bcrypt.compare( orgPassword, this.password)
    return isCorrect
}
module.exports = mongoose.model('Users', UserSchema)