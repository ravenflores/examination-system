const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")
const User = mongoose.model("User")

router.get('/user/:id',requireLogin,(req,res)=>{
       User.findOne({_id:req.params.id})
       .select("-password")
       .then(user => {
           Post.find({postedBy:req.params.id})
           .populate("postedBy","_id name")
           .exec((err,posts)=>{
               if(err){
                   return res.status(422).json({error:err})
               }
               const statuss = user.followers.indexOf(req.user._id)

               console.log(user.followers)
               console.log(req.user._id)
               console.log(statuss)
               if(statuss>0){
                console.log("trye")
                res.json({user,posts,status:false})
               }
               else{
                console.log("ekis") 
                res.json({user,posts,status:true})
               }
               
           })
       }).catch(err =>{
           return res.status(404).json({error:"user not found"})
       })
   
    
})
router.put('/updateprofile',requireLogin,(req,res)=>{
    console.log(req.body)
    User.findByIdAndUpdate(req.user._id,{
        
        $set:{photo:req.body.photo}
    },{new: true})
    .select("-password")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            console.log(result)
            res.json(result)  
        }
    })
})

router.put('/follow',requireLogin,(req,res)=>{
    console.log(req.body)
    User.findByIdAndUpdate(req.body.followid,{
        $push:{followers:req.user._id}
    },{new: true})
    .select("-password")
    .exec((err,followers)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            User.findByIdAndUpdate(req.user._id,{
                $push:{following:req.body.followid}
            },{new: true})
            .select("-password")
            .then(result => {
                res.json(result)
            }).catch(err=>{
                return res.status(422).json({error:err})
            })
           
        }
    })
})
router.put('/unfollow',requireLogin,(req,res)=>{    
    User.findByIdAndUpdate(req.body.unfollowid,{
        $pull:{followers:req.user._id}
    },{new: true})
    .select("-password")
    .exec((err,followers)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
           
            User.findByIdAndUpdate(req.user._id,{
                $pull:{following:req.body.unfollowid}
            },{new: true})
            .select("-password")
            .then(result => {
                res.json(result)
            }).catch(err=>{
                return res.status(422).json({error:err})
            })
           
        }
    })
})

module.exports = router