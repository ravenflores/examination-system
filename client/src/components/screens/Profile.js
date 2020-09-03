import React,{useEffect,useState,useContext} from 'react'
import { UserContext } from '../../App'
import '../../App.css'
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

function Profile() {
  
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const history = useHistory()
    
    console.log(state)
    useEffect(()=>{
    fetch('/mypost',{
        headers:{
            "Authorization": "Bearer "+localStorage.getItem("jwt")
        }
    })
    .then(res => res.json())
    .then(result => {
        console.log(result)
        setPics(result.mypost)
    })
    },[])  
    useEffect(()=>{
    if(image){
        postDetails()
    }
    },[image])  

    const useStyles = makeStyles((theme) => ({
        backdrop: {
          zIndex: theme.zIndex.drawer + 1,
          color: '#fff',
        },
      }));

      const classes = useStyles();
      const [open, setOpen] = React.useState(false);
      const handleClose = () => {
        setOpen(false);
      };
      const handleToggle = () => {
        setOpen(!open);
      };

    const PostData =(pic) =>{
       
        fetch("/updateprofile",{
            method:"put",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                email:state.email,
                photo:pic

            })
        }).then(res => res.json())
        .then(data =>{
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
                handleClose()
            }
            else{
                handleClose()
                M.toast({html:"Profile Updated",classes:"#388e3c green darken-2"})
                dispatch({type:"UPDATEIMAGE",payload:{photo:data.photo}})
                localStorage.setItem("user",JSON.stringify(data))
                console.log(data.photo)
                history.push('/profile')
            }
        })
    }
    

    const postDetails = () =>{
        handleToggle()
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","project-instagram")
        data.append("cloud_name","raven23rd")
        fetch("https://api.cloudinary.com/v1_1/raven23rd/image/upload",{
            method: "post",
            body:data
        })
        .then(res=>res.json())
        .then(data => {
            console.log(data)
            // setUrl(data.url)
            PostData(data.url)
        })
        .catch(err => {

            handleClose()
            console.log(err)
        })
        
       

        
        
        
    }
    const imageLink = (e) =>{
        
        history.push('/profile/post/'+e)
    }

    
    return (
        <>
        <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
        </Backdrop>
        <div style={{maxWidth:"550px",margin: "0px auto"}}>
            <div style = {{
                
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>

            <div id="profilediv">
                <div id="profileimagediv">
                
                    <img id ="profileimage"
                    src={state?state.photo:"https://images.unsplash.com/photo-1522039553440-46d3e1e61e4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"}
                    />
                    
                </div>
                <div >  
                    <h4 id="profilename"> {state?state.name:"loading"} </h4>
                    <div id="profiletextdiv" >
                    <h6 id= "profiletext">{mypics.length} post</h6>
                    <h6 id= "profiletext">{state?state.followers.length:0} followers</h6>
                    <h6 id= "profiletext">{state?state.following.length:0} following</h6> 

                    </div>
                </div>

            </div>

            <div className="file-field input-field" style ={{margin:"10px"}}>
                    <div className="btn #64b5f6 blue lighten-2">
                        <span>Upload Profile</span>
                        <input type="file" onChange={
                            
                            (e)=>setImage(e.target.files[0])
                            }/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
            </div>
           
            </div>
            <div className="gallery">
                {  
                    mypics.map(item => {
                        return(
                             <img id="gallery-image" key={item._id} className = "item" src= {item.photo} onClick={()=>imageLink(item._id)} />
                            
                        )
                    })
                }
              </div>

        </div>
        </>
    )
}



export default Profile
