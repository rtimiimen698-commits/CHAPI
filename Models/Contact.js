const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema(
    {
        name : String,
        age : Number,
        email : {type : String, unique : true, required : true}
    }
)

module.exports = mongoose.model('kacem', contactSchema)