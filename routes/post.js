const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")


router.get('/allpost',requireLogin,(req,res) =>{
    Post.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy" ,"_id name")
    .then(posts => {
        posts.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.datePosted) - new Date(a.datePosted);
          });
        res.json(posts)
    })
    .catch(err => {
        console.log(err)
    })

    
})
router.get('/getsubpost',requireLogin,(req,res) =>{
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy" ,"_id name")
    .then(posts => {
        posts.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.datePosted) - new Date(a.datePosted);
          });
        res.json(posts) 
    })
    .catch(err => {
        console.log(err)
    })
})
router.get('/getpost/:id',requireLogin,(req,res) =>{
    Post.find({_id:req.params.id})
    .populate("postedBy","_id name")
    .populate("comments.postedBy" ,"_id name")
    .then(posts => {
        res.json(posts) 
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/createpost',requireLogin,(req,res) => {
    console.log("eto :"+ JSON.stringify( req.body))
    const {title,body,picture} = req.body
    if(!picture){
       return res.status(422).json({error: "Please add photo!"})
    }
  
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo:picture,
        postedBy: req.user,
        datePosted:Date.now()
    })

    post.save().then(result => {
        res.json({
            post:result
        })

    })
    .catch(err => {
        console.log(err)
    })
    
})

router.get("/mypost",requireLogin,(req,res) => {
    Post.find({postedBy:req.user._id})
    .populate("postedBy", "_id name")
    .then(mypost =>{
        mypost.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.datePosted) - new Date(a.datePosted);
          });
        res.json({mypost})
    })
    .catch((err) => {
        console.log(err)
    })
})

router.put('/like',requireLogin,(req,res)=> {
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error: err})
        }
        else{
            res.json(result)
        }
    })


})
router.put('/unlike',requireLogin,(req,res)=> {
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error: err})
        }

        else{
            res.json(result)
        }
    })


})



router.put('/comment',requireLogin,(req,res)=> {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error: err})
        }
        else{
            console.log(result)
            res.json(result)
        }
    })
})

router.delete('/deletepost/:postId',requireLogin,(req,res) => {
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if (post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result =>{
                res.json(result)
            }).catch(err => {
                console.log(err)
            })
        }
    })
    
})
router.put('/deletecomment/:postId/:commentId',requireLogin,(req,res) => {
 
    console.log(req.params.commentId)
    Post.findByIdAndUpdate({_id:req.params.postId},{
        $pull:{"comments":{"_id":req.params.commentId}}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error: err})
        }
        else{
            console.log(result)
            res.json(result)
        }
    })
    
   
 
})

router.put('/updatecomment/:postId/:commentId',requireLogin,(req,res) => {
   console.log(req.body.text+"text")
    console.log(req.params.commentId+"cmment")
    Post.updateOne({_id:req.params.postId,"comments._id":req.params.commentId},{
        $set:{"comments.$.text":req.body.text}
    })
    .exec((err,result)=>{
        if(err){
            console.log(err)
            
        }
        else{
            console.log(result)

            Post.findOne({_id:req.params.postId})
            .populate("comments.postedBy","_id name")
            .populate("postedBy","_id name")
            .exec((err,result)=>{
                if(err){
                    console.log(err)
                    return res.status(422).json({error: err})
                }
                else{
                    console.log(result)
                    res.json(result)
                }
            })
            
        }
    } )

  
   


    
   
 
})



  

module.exports = router