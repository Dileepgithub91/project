let express = require('express')
let mongoose = require('mongoose')
let app = express()
let routes = require('./routes/routes')
app.use(express.json()) //altervative to bodyparser
mongoose.set('strictQuery', true)

mongoose.connect('mongodb+srv://piyushtale:piyushrajutale@cluster0.t7w7ipr.mongodb.net/Project1Blog')
.then(console.log("MongoDb is connected"))
.catch((e) => console.log(e))

app.use('/',routes)
app.listen(3000,function(){
    console.log("Server is running")
})
