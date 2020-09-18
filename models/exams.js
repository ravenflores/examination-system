const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    examname: {
        type: String,
        required:true,
        
    },
    grade: {
        type: Number,
        required: true,
        
    },
    section: {
        type: String,
        required: true,
    },
    durationhrs: {
        type: Number,
        required: true,
    },
    durationmins: {
        type:Number,
        required: true,
    },
    date: {
        type:Date,
        required: true,
    },
    createdBy:[{
        type:ObjectId,
        ref: "User"
    }],
})
mongoose.model("Exams",userSchema)