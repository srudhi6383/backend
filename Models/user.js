const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone_number:String,
    department:String,
    notices:[{type:mongoose.Schema.Types.ObjectId, ref:'Notice'}]

})
module.exports = mongoose.model('User', userSchema)
