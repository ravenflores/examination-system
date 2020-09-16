const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Exams = mongoose.model("Exams")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require ('../config/keys')
const requireLogin = require('../middleware/requireLogin')


router.get('/protected',requireLogin,(req,res) => {
    
    res.send("Hello User")
})

router.post('/createexam',(req,res) => {
    const {examname,grade,section,durationhrs,durationmins,date} = req.body
    if(!examname || !grade || !section || !durationhrs || !durationmins || !date) {
        return res.status(422).json({error: "Please add all the fields"})
    }
    
    const exam = new Exams({
        examname,
        grade,
        section,
        durationhrs,
        durationmins,
        date,
    })

    exam.save().then(result => {
        res.json({
            exam:result
        })

    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/signinteacher',(req,res) => {
    
    const {email,password} = req.body
    if(!email || !password){ 
        res.status(422).json({error:"Please provide email or password"})
        console.log("")
    }

    Teachers.findOne({email:email})
    .then(savedUser => {
        console.log(savedUser)
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch => {
            if(doMatch){
                
                // res.json({message:"succesfully signed In"})
                const token = jwt.sign({
                    _id: savedUser._id
                },JWT_SECRET)
                const {_id,name,email,photo,followers,following} = savedUser
                res.json({token,user:{_id,name,photo,email,followers,following}})
            }
            else{
                return res.status(422).json({error: "Invalid password"})
                
            }
        })
        .catch(err =>{
            console.log(err)
        })

    })
})





module.exports = router