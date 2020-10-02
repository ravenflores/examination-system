const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    grade: {
        type: Number,
        required:true,
    },
    section: {
        type: String,
        required:true,
    },
})
mongoose.model("Classes",userSchema)