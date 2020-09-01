 import React,{useState, useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


function Home() {
    const [data,setData] = useState([])
    const {state,dispatch} =  useContext(UserContext)
    const [comment,setComment] = useState("")
    const [comId,setComId] = useState()
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
                            <i className="material-icons" style={{color:"red"}}>favorite</i >
                            {item.likes.includes(state._id)
                            ?<i className="material-icons"
                            onClick={()=>{unlikePost(item._id)}}
                           >thumb_down</i> :   <i className="material-icons"
                           onClick={()=>{likePost(item._id)}}
                           >thumb_up</i>
                            }
                          
                            
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(record => {
                                       
                                        return (
                                        <h6 key = {record._id}><span style = {{fontWeight:"700"}}> {record.postedBy.name} </span> <i style = {{float:"right"}}>
                                        <Button size="small" aria-controls="simple-menu" aria-haspopup="true"  onClick={(e) => {
                                           
                                            handleClick(e)
                                            setComId(record._id)
                                            }}>
                                            <a id= "bb">...</a>
                                        </Button>
                                        </i>
                                        <p id="pp">{record.text}</p>
                                        
                                        {
                                            record.postedBy._id == state._id && 

                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={(e) => deleteComment(item._id,record._id)}>delete</MenuItem>
                                            <MenuItem onClick={handleClose}>edit</MenuItem>
                                            
                                        </Menu>
                                                
                                        }
                                        
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
