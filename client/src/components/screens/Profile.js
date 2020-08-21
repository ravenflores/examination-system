import React,{useEffect,useState,useContext} from 'react'
import { UserContext } from '../../App'
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'

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
            }
            else{
                M.toast({html:"Saved Successfully",classes:"#388e3c green darken-2"})
                dispatch({type:"UPDATEIMAGE",payload:{photo:data.photo}})
                localStorage.setItem("user",JSON.stringify(data))
                console.log(data.photo)
                history.push('/profile')
            }
        })
    }
    

    const postDetails = () =>{
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


            console.log(err)
        })
        
       

        
        
        
    }
    return (
        <div style={{maxWidth:"550px",margin: "0px auto"}}>
            <div style = {{
                
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>

            <div style = {{
                display:"flex",
                justifyContent:"space-around",
                margin: "18px 0px",
                
                
            }}>
                <div>
                    <img style= {{width: "160px",height:"160px",borderRadius:"80px"}}
                    src={state?state.photo:"https://images.unsplash.com/photo-1522039553440-46d3e1e61e4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"}
                    />
                    
                </div>
                <div >
                    <h4> {state?state.name:"loading"} </h4>
                    <div style = {{display: "flex", justifyContent:"space-between",width:"108%"}}>
                    <h6>{mypics.length} post</h6>
                    <h6>{state?state.followers.length:0} followers</h6>
                    <h6>{state?state.following.length:0} following</h6> 

                    </div>
                </div>

            </div>

            <div className="file-field input-field" style ={{margin:"10px"}}>
                    <div className="btn #64b5f6 blue lighten-2">
                        <span>Upload Image</span>
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
                            <img key={item._id} className = "item" src= {item.photo} />

                        )
                    })
                }
              </div>

        </div>
    )
}



export default Profile
