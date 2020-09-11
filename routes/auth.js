const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Teachers = mongoose.model("Teachers")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require ('../config/keys')
const requireLogin = require('../middleware/requireLogin')


router.get('/protected',requireLogin,(req,res) => {
    
    res.send("Hello User")
})

router.post('/signupteacher',(req,res) => {
    const {firstname,lastname,email,password,photo} = req.body
    if(!firstname || !lastname || !email  || !password || !photo) {
        return res.status(422).json({error: "Please add all the fields"})
    }
    
    Teachers.findOne({email: email})
    .then ((savesUser) => {
        if(savesUser){
            console.log("may email")
            return res.status(422).json({error: "Email already used"})
        }
        bcrypt.hash(password,12)
        .then(hashpassword => {

            const teacher = new Teachers({
                email,
                password:hashpassword,
                firstname,
                lastname,
                photo
                
            })
    
            teacher.save()
            .then(user => {
                console.log("Saved successfully")
                res.json({message:"Saved successfully"})
            })
            .catch(err => {
                console.log(err)
            })

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