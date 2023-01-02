let mongoose = require('mongoose')
let authorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        enum: ['Mr', 'Mrs', 'Mrs']
    },
    emails:{
        type:String,
        required:true,
        unique:true,
        //Change match if error occurs
        match : [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Galat email bheja'],
    },
    password:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('author',authorSchema)
