const blogSchema = require("../Models/Blogs")

const authorization = async function(req, res, next) {
    try {
        //checking whether author has posted this blog or not
        let x = req.params.blogId
            //console.log(x)
        let Id = req.Id
            //console.log(Id)
        let db = await blogSchema.findOne({ _Id: x })
            //console.log(db)
        if (!db) return res.status(404).send({ msg: "data not found" })
        let y = db.authorId.toString()
            //console.log(y)
        if (Id == y) {
            next()
        } else {
            res.status(403).send({ msg: "unauthorized user" })
        }
    } catch (error) { return res.status(500).send({ msg: "server issue" }) }
}

const queryAuthorization = async function(req, res, next) {
    try {
        let x = req.query // {}
        let db = await blogSchema.find({ $and: [x, { authorId: req.Id }] }) //array
        if (!db) return res.status(404).send("No Blogs exists with this Query") //Tomorrow
        next()
    } catch (error) { return res.status(500).send({ msg: "server issue" }) }

}


module.exports.authorization = authorization
module.exports.queryAuthorization = queryAuthorization