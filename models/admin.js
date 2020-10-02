const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required:true,
        
    },
    lastname: {
        type: String,
        required:true,
        
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type:String,
        required: false
    }
    
})

mongoose.model("Admin",userSchema)