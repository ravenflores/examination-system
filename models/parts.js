const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    type: {
        type: String,
        required:true,
        
    },
    items: {
        type: Number,
        required:true,
        
    },
    points: {
        type: Number,
        required:true,
        
    },
    difficulty: {
        type: String,
        required:true,
        
    },
    instructions: {
        type: String,
        required:true,
        
    },
    examId:[{
        type:ObjectId,
        ref: "Exams",
    }],
})
mongoose.model("Parts",userSchema)