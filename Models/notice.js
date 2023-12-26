const mongoose =require('mongoose')

const noticeSchema = new mongoose.Schema({
    title: String,
    body: String,
    category : {type:String, enum :['parking', 'covid', 'maintainence']},
    date : String,
    user : {type: mongoose.Schema.Types.ObjectId, ref : 'user'}

})
module.exports = mongoose.model("Notice", noticeSchema)
