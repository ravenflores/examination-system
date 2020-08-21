const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require ('../config/keys')
const requireLogin = require('../middleware/requireLogin')


router.get('/protected',requireLogin,(req,res) => {
    
    res.send("Hello User")
})

router.post('/signup',(req,res) => {
    const {name,email,password,photo} = req.body
    if(!email || !password || !name || !photo) {
        return res.status(422).json({error: "please add all the fields"})
    }
    res.json({message:"successfully created"})

    User.findOne({email: email})
    .then ((savesUser) => {
        if(savesUser){
            return res.status(422).json({error: "user already exist with that email"})
        }
        bcrypt.hash(password,12)
        .then(hashpassword => {

            const user = new User({
                email,
                password:hashpassword,
                name,
                photo,
                followers:[],
                following:[]
            })
    
            user.save()
            .then(user => {
                res.json({message:"saved successfuly"})
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
router.post('/signin',(req,res) => {
    const {email,password} = req.body
    if(!email || !password){
        res.status(422).json({error:"please provide email or password"})
    }

    User.findOne({email:email})
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
                return res.status(422).json({error: "Invalid Password"})

            }
        })
        .catch(err =>{
            console.log(err)
        })

    })
})





module.exports = router