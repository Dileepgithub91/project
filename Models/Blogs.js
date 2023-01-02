let mongoose = require('mongoose')
let objectId = mongoose.Schema.Types.ObjectId

let blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: objectId,
        required: true,
        ref: 'author'
    },
    tags: {
        type: [String]
    },
    category: {
        type: String,
        required: true
    },
    subcategory:{
        type:[String],
    },
    deletedAt:{
        type: Date
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    publishedAt:{
        type: Date
    },
    isPublished:{
        type:Boolean,
        default:false
    }

},{timestamp:true})
module.exports = mongoose.model('blog', blogSchema)
