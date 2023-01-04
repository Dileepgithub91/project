let express = require('express')
let mongoose = require('mongoose')
let app = express()
let routes = require('./routes/routes')
app.use(express.json()) //altervative to bodyparser

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('strictQuery', true) //extra message hide

mongoose.connect('mongodb+srv://dileepkm:L3cuCdGwQQWTF3Hs@cluster0.iqkms8u.mongodb.net/test')
    .then(console.log("MongoDb is connected"))
    .catch((e) => console.log(e))

app.use('/', routes)
app.listen(3000, function() {
    console.log("Server is running")
})