 import React,{useState, useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Container } from '@material-ui/core';

function Home() {
    const [data,setData] = useState([])
    const {state,dispatch} =  useContext(UserContext)
    const [comment,setComment] = useState("")
    const [comId,setComId] = useState()
    const [edit,setEdit] = useState("")
    const [text,setText] = useState("")
    useEffect(() => {
        fetch('/allpost',{
            headers:{
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            setData(result)
        })
    },[])   

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    

    const likePost = (id) =>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization" :"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
        .then(result=>{
            console.log(result)
            const newData  = data.map(item => {
                if(item._id == result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(newData)
        }).catch(err => {
            console.log(err)
        })
    }
    const unlikePost = (id) =>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization" :"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
        .then(result=>{
            console.log(result)
            const newData  = data.map(item => {
                if(item._id == result._id){
                    
                    return result
                }
                else{
                    return item
                }
            })
            setData(newData)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const makeComment = (text,postId) => {
        console.log(text.value)
        fetch("/comment",{
            method: "put",
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : "Bearer "+ localStorage.getItem("jwt")
            },body: JSON.stringify({
                postId,
                text:text.value

            })
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            text.value = ""
            const newData  = data.map(item => {
                if(item._id == result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(newData)
        }).catch(err =>{ 
            console.log(err)
        })
    }


    const deletePost = (postid) => {
        console.log(postid)
        fetch(`/deletepost/${postid}`,{
            method: "delete",
            headers: {
                Authorization : "Bearer "+localStorage.getItem("jwt")

            }
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            const newData = data.filter(item => {
                return item._id !== result._id
            })
            setData (newData)
        })
    }
    const deleteComment = (postId,commentId) => {
        handleClose()
        console.log(comId)
        fetch(`/deletecomment/${postId}/${comId}`,{
            method: "put",
            headers: {
                "Content-Type":"application/json",
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
        
            // console.log(re)
            const newData  = data.map(item => {
                if(item._id == result._id){
                    console.log(state._id)
                    return result
                }
                else{
                    return item
                }
            })
             setData(newData)
        })
        
    }

    const editComment = (e) => {

        console.log(e)
        setEdit("")
        handleClose()
        setEdit(e)
    } 
    const closeComment = () => {

        setEdit("")
    }

    const updateComment = (e,postId) => {

        console.log(e.target.id)
        fetch(`/updatecomment/${postId}/${comId}`,{
            method: "put",
            headers: {
                "Content-Type":"application/json",
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                text
            })
        }).then(res => res.json())
        .then(result => {
        
            // console.log(re)
            const newData  = data.map(item => {
                if(item._id == result._id){
                    console.log(state._id)
                    return result
                }
                else{
                    return item
                }
            })
             setData(newData)
             
        }, setEdit(""))

    }

    


    return (
        <div className="home">
            {


                data.map(item => {
                    return(
                        <div className = "card home-card" key={item._id}>
                        <h5 style = {{padding:"6px"}}><Link to ={item.postedBy._id !== state._id ? "/profile/"+item.postedBy._id:"/profile/"}>{item.postedBy.name}</Link> {
                            item.postedBy._id == state._id &&  <i className="material-icons" style = {{
                                float: "right"
                            }}
                            onClick = {() => deletePost(item._id)}
                            >delete</i>
                        }
                       
                        </h5>
                        
                            <div className="card-image">
                                <img src={item.photo} />
                            </div>                          
                            <div className="card-content">
                           
                            {item.likes.includes(state._id)
                            ?<i className="material-icons"
                            style={{color:"red"}}
                            onClick={()=>{unlikePost(item._id)}}
                           >favorite</i> :   <i className="material-icons"
                           style={{color:"red"}}
                           onClick={()=>{likePost(item._id)}}
                           >favorite_border</i>
                            }
                          
                            
                                <h6>{item.likes.length}{item.likes.length>1?" likes":" like"} </h6>
                                <h5>{item.title}</h5>
                               <p id="body">{item.body}</p>
                                
                                {
                                    item.comments.map(record => {
                                       
                                        return (
                                        <h6 key = {record._id}><span style = {{fontWeight:"700"}}> {record.postedBy.name} </span> 
                                        


                                        {
                                            record.postedBy._id == state._id && 
                                            <i style = {{float:"right"}}>
                                        <Button size="small" aria-controls="simple-menu" aria-haspopup="true"  onClick={(e) => {
                                           
                                            handleClick(e)
                                            setComId(record._id)
                                            closeComment()
                                            setText(record.text)
                                            
                                            }}>
                                            <a id= "bb">...</a>
                                        </Button>
                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={(e) => deleteComment(item._id,record._id)}>delete</MenuItem>
                                            <MenuItem onClick={()=>editComment(comId)}>edit</MenuItem>
                                            
                                        </Menu>
                                        </i>

                                        
                                                
                                        }
                                        
                                        
                                        {edit == record._id?<><textarea value={text} onChange={(e)=>setText(e.target.value)}></textarea><button  onClick={()=>closeComment()}>cancel</button> <button id={record._id} onClick={(e)=>updateComment(e,item._id)}>save</button> </>:<p id="pp">{record.text}</p>} 
                                        
                                        
                            
                                        </h6>
                                        )
                                    })
                                }
                                <form onSubmit = {(e)=>{
                                    e.preventDefault()
                                   makeComment(e.target[0],item._id)

                                }}>

                                <input type="text" placeholder="add comment..." />
                                </form>
                            </div>
                        </div>      
                    )
                })
            }
              
        </div>
    )
}

export default Home
