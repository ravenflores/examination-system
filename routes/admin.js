const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Teachers = mongoose.model("Teachers")
const Admin = mongoose.model("Admin")
const Classes = mongoose.model("Classes")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require ('../config/keys')
const requireLogin = require('../middleware/requireLogin')


router.post('/addclass',requireLogin,(req,res) => {
    const {grade,section} = req.body
    if(!grade || !section) {
        return res.status(422).json({error: "Please add all the fields"})
    }
    
    Classes.findOne({section: section})
    .then ((savesUser) => {
        if(savesUser){
            console.log("may email")
            return res.status(422).json({error: "Email already used"})
        }
       
            const classes = new Classes({
                grade,
                section
                
            })
    
            classes.save()
            .then(user => {
                console.log("Saved successfully")
                res.json({message:"Saved successfully"})
            })
            .catch(err => {
                console.log(err)
            })

        
      
    })
    .catch(err => {
        console.log(err)
    })
})

router.get("/classlist/:grade",requireLogin,(req,res) => {
    Classes.find({grade:req.params.grade})
    .populate("createdBy", "_id name")
    .then(mypost =>{
        res.json({mypost})
    })
    .catch((err) => {
        console.log(err)
    })
})

module.exports = router