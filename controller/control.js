const authorSchema = require("../Models/Author")
const blogSchema = require("../Models/Blogs")
    ///Populate use nhi kiya

const createAuthor = async function(req, res) {
    try {

        let data = req.body
        if (Object.keys(data).length == 0) return res.status(404).send({ status: false, msg: "pls enter your data" })

        // if 3 data is missing and starting counting from fname
        if (!data.fname && !data.lname && !data.title) return res.status(404).send({ status: false, msg: "pls enter your fname,lname and title" })
        if (!data.fname && !data.lname && !data.emails) return res.status(404).send({ status: false, msg: "pls enter your fname,lname and emails" })
        if (!data.fname && !data.lname && !data.password) return res.status(404).send({ status: false, msg: "pls enter your fname,lname and password" })

        // targetting from lname

        if (!data.lname && !data.title && !data.emails) return res.status(404).send({ status: false, msg: "pls enter your lnamen,title and emails" })
        if (!data.lname && !data.title && !data.password) return res.status(404).send({ status: false, msg: "pls enter your lnamen,title and password" })

        // targetting from title 
        if (!data.title && !data.emails && !data.password) return res.status(404).send({ status: false, msg: "pls enter your title,emails and password" })


        // if 2 data is missing
        // targetting fname and all remaining
        if (!data.fname && !data.lname) return res.status(404).send({ status: false, msg: "pls enter your fname and lname" })
        if (!data.fname && !data.title) return res.status(404).send({ status: false, msg: "pls enter your fname and title" })
        if (!data.fname && !data.emails) return res.status(404).send({ status: false, msg: "pls enter your fname and emails" })
        if (!data.fname && !data.password) return res.status(404).send({ status: false, msg: "pls enter your fname and passowrd" })

        //targetting lname and remaining
        if (!data.lname && !data.title) return res.status(404).send({ status: false, msg: "pls enter your lnamen and title" })
        if (!data.lname && !data.emails) return res.status(404).send({ status: false, msg: "pls enter your lnamen and emails" })
        if (!data.lname && !data.password) return res.status(404).send({ status: false, msg: "pls enter your lnamen and password" })

        //targetting title and remaining
        if (!data.title && !data.emails) return res.status(404).send({ status: false, msg: "pls enter your title and emails" })
        if (!data.title && !data.password) return res.status(404).send({ status: false, msg: "pls enter your title and password" })

        //targetting emails and remaining
        if (!data.emails && !data.password) return res.status(404).send({ status: false, msg: "pls enter your emails and password" })

        // if 1 data is missing
        if (!data.fname) return res.status(404).send({ status: false, msg: "pls enter your fname " })
        if (!data.lname) return res.status(404).send({ status: false, msg: "pls enter your lname" })
        if (!data.title) return res.status(404).send({ status: false, msg: "pls enter your title" })
        if (!data.emails) return res.status(404).send({ status: false, msg: "pls enter your emails" })
        if (!data.password) return res.status(404).send({ status: false, msg: "pls enter your password" })

        let authorDetail = await authorSchema.create(data)
        res.status(201).send({ status: true, msg: authorDetail })

    } catch (error) {
        res.status(500).send(error.message)
    }
}

const createBlog = async function(req, res) {
    try {
        let data = req.body
        if (!data.title) return res.status(404).send({ status: true, msg: "pls enter title" })
        if (!data.body) return res.status(404).send({ status: true, msg: "pls enter body" })
        if (!data.authorId) return res.status(404).send({ status: true, msg: "pls enter authorId" })
        if (!data.subcategory) return res.status(404).send({ status: true, msg: "pls enter subcategory" })

        let x = data.authorId //124143  
            //if [] is empty then response wil be []
            //if {} is empty then resposne will be null
        let y = await authorSchema.findOne({ _id: x }) // {empty} => null
            //console.log(y)
        if (y != null) {
            let z = await blogSchema.create(req.body)
            res.status(201).send(z)
        } else {
            res.status(400).send("Invalid Request")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}



const getBlog = async function(req, res) {
    try {
        //Check if schema consists of data which have isDeleted:false , isPublished:true and apply query parameter on that result
        let x = await blogSchema.find({ $and: [{ isDeleted: false, isPublished: true }, req.query] }) //returns []
            //if array is empty 
        if (x.length > 0) {
            res.status(200).send(x)
        } else {
            res.status(404).send("No documents are found")
        }
    } catch (e) {
        res.status(500).send(e.message)
    }
}

const updateBlog = async function(req, res) {
    try {
        let id = req.params.blogId
            //check if id is given or not
        if (id.length == 0) return res.status(404).send("Blog Id is needed")
            //Check if blog Id exixts or not and whether isDeleted is true ?
        let x = await blogSchema.findById(id) //object
        if (x == null) return res.status(404).send({ status: false, msg: "Blog Not Found" })
        if (x.isDeleted == true) return res.status(401).send({ status: false, msg: "Blog is already deleted" })
            //Now update the doc by Id
        let updateBlog = await blogSchema.findByIdAndUpdate({ _id: id }, {
            $set: {
                title: req.body.title,
                body: req.body.body,
                publishedAt: Date.now(),
                isPublished: true
            },
            $addToSet: { //use addToSet to push into array of tags and subcategory
                tags: req.body.tags,
                subcategory: req.body.subcategory
            }
        }, { new: true })
        res.status(201).send({ status: true, msg: updateBlog }) //Success if modified

    } catch (error) {
        res.status(500).send(error.message)
    }

}

const deleteParam = async function(req, res) {
    try {
        let id = req.params.blogId //get the endpoint variable from url
            //check whether id is avaialble in schema
        let x = await blogSchema.findById(id) //{}
        if (x == null) return res.status(404).send({ status: false, msg: "Blog not found" })
            //Check if doc contains isDeleted as true or not
        if (x.isDeleted == true) return res.status(400).send({ status: false, msg: "Document already deleted" })
            //if isDeleted is marked as false then update it to true for deletion
        let y = await blogSchema.findByIdAndUpdate({ _id: id }, { isDeleted: true, deletedAt: Date.now() }, { new: true })
        return res.status(200).send({ status: true, msg: y })
    } catch (e) {
        res.status(500).send(e.message)
    }
}

const deleteQuery = async function(req, res) {
    try {
        let query = req.query //Object syntax {_id:12434643}
            //Search for objects with query parameter
        let x = await blogSchema.find(query) //array []
            //check whether doc exists with this query
        if (x.length == 0) return res.status(404).send({ status: false, msg: "Blog not found " })
            //check if particular doc condition is isDeleted:False and query, updateMany is a loop working in backend for each object
        let y = await blogSchema.updateMany({ $and: [{ isDeleted: false }, query] }, { isDeleted: true, deletedAt: Date.now() }, { new: true })
            //check if modifedCount is greater than 0
        if (y.modifiedCount > 0) {
            res.status(201).send({ msg: "Successfully deleted" })
        } else {
            res.status(404).send({ msg: "Blog is deleted" })
        }
    } catch (e) {
        res.status(500).send(e.message)
    }
}
module.exports.createAuthor = createAuthor
module.exports.createBlog = createBlog
module.exports.getBlog = getBlog
module.exports.updateBlog = updateBlog
module.exports.deleteParam = deleteParam
module.exports.deleteQuery = deleteQuery