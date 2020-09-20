const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Exams = mongoose.model("Exams")
const Parts = mongoose.model("Parts")
const Items = mongoose.model("Items")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require ('../config/keys')
const requireLogin = require('../middleware/requireLogin')


router.get('/protected',requireLogin,(req,res) => {
    
    res.send("Hello User")
})

router.get("/myexams",requireLogin,(req,res) => {
    Exams.find({createdBy:req.user._id})
    .populate("createdBy", "_id name")
    .then(mypost =>{
        mypost.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.date) - new Date(a.date);
          });
        res.json({mypost})
    })
    .catch((err) => {
        console.log(err)
    })
})

router.post('/createexam',requireLogin,(req,res) => {
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
        createdBy:req.user,
        dateCreated:Date.now(),
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

router.post('/createparts',requireLogin,(req,res) => {
    const {type,items,points,difficulty,instructions,examId} = req.body
    if(!type || !items || !points || !difficulty || !instructions || !examId) {
        return res.status(422).json({error: "Please add all the fields"})
    }
    
    const parts = new Parts({
        type,
        items,
        points,
        difficulty,
        instructions,
    })

    parts.save().then(result => {
        res.json({
            parts:result
        })

    })
    .catch(err => {
        console.log(err)
    })
})
router.post('/createitems',requireLogin,(req,res) => {
    const {question,answer,choices,points,partsId} = req.body
    if(!question || !answer || !choices || !points || !partsId) {
        return res.status(422).json({error: "Please add all the fields"})
    }
    
    const items = new Items({
        question,
        answer,
        choices,
        points,
        partsId
    })

    items.save().then(result => {
        res.json({
            items:result
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