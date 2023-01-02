const authorSchema = require("../Models/Author")
const blogSchema = require("../Models/Blogs")
///Populate use nhi kiya

const createAuthor = async function (req, res) {
    try {
        let x = await authorSchema.create(req.body)
        res.status(201).send(x)
    }
    catch (error) {
        res.status(401).send(error.message)
    }
    //create vs save
}
const createBlog = async function (req, res) {
    try {
        let x = req.body.authorId //124143  
        //if [] is empty then response wil be []
        //if {} is empty then resposne will be null
        let y = await authorSchema.findOne({ _id: x })// {empty} => null
        //console.log(y)
        if (y != null) {
            let z = await blogSchema.create(req.body)
            res.status(201).send(z)
        }
        else {
            res.status(400).send("Invalid Request")
        }
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}
// Query paremeter is remainining here
const getBlog = async function (req, res) {
    let x = await blogSchema.find({ isDeleted: false, isPublished: true }) //[]
    if (x.length > 0) {
        res.status(200).send(x)
    }
    else {
        res.status(404).send("No documents are found")
    }

}

const updateBlog = async function(req,res){
    let id = req.params.blogId
    //{$addToSet:{tags:req.body.tags}} use to push into array
    //let x = await blogSchema.findByIdAndUpdate({_id:id},req.body,{new:true})
    //let y = await blogSchema.findByIdAndUpdate({_id:id},{$set:{isPublished:true,publishedAt:Date.now()}},{new:true})
    let z = await blogSchema.findOne({_id:id}) //{}
    if(z != null){
        if(z.isDeleted === false){
            res.status(200).send(z)
        }
        else{
            res.status(404).send({status:false,msg:"isDeleted is true "})
        }
    }
    
}
module.exports.createAuthor = createAuthor
module.exports.createBlog = createBlog
module.exports.getBlog = getBlog 
module.exports.updateBlog = updateBlog