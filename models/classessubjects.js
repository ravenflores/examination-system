const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    subjectname: {
        type: String,
        required:true,
    },
    teacher: {
        type:ObjectId,
        ref: "Teachers"
    },
    class: {
        type:ObjectId,
        ref: "Classes"
    },
})
mongoose.model("ClassSubjects",userSchema)