const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    question: {
        type: String,
        required:true,
        
    },
    answer: {
        type: String,
        required:true,
        
    },
    choices:[{
        choice: {
            type: String,
        },
        required:false,
    }],
    points:{
        type:Number,
        required:true,
    },  
    partsId:{
        type:ObjectId,
        ref: "Parts",
    },
})
mongoose.model("Items",userSchema)