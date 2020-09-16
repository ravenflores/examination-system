const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
require ('dotenv').config()
const {MONGOURI} = require('./config/keys')
const port = process.env.PORT || 5000

//user-admin
//user-pass
require ('./models/user')
// require ('./models/post')
require ('./models/teachers')
require ('./models/students')
require ('./models/exams')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/exams'))
// app.use(require('./routes/post'))
// app.use(require('./routes/user'))

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((err) => {
    console.log(err)
})
mongoose.connection.on('connected',()=> {
    console.log("connected to mongo yeahhh")
   
})

const customMiddleware = (req,res,next) =>{
    console.log("Midadaddleware Executed!")
    next()
}





// app.use(customMiddleware)   


// app.get('/',(req,res) => {
//     console.log("home")
//     res.send("Hello World")
// })
app.get('/about',customMiddleware,(req,res) => {
    console.log("about")
    res.send("Hello World About")
})

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"))
    const path = require('path')
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(port, () => {
    console.log(`Server is runningon port: ${port}`)
})