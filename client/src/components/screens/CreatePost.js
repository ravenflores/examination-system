import React,{useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'

function CreatePost() {
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const postCreate = (pic) => {
        console.log(pic)
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type": "application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({   
                title,
                body,
                picture:pic

            })
        }).then(res => res.json())
        .then(data =>{ 
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:"Post Created!",classes:"#388e3c green darken-2"})
                history.push('/')
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
            postCreate(data.url)
        })
        .catch(err => {


            console.log(err)
        })
        
       

        
        
        
    }
    

    return (
        <div className="card input-field" style={{
            margin:"30px auto",
            maxWidth: "500px",
            padding: "20px",
            textAlign: "center"
            
        }}>
            <input type= "text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <input type= "text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)}/>
            <div className="file-field input-field">
                    <div className="btn #64b5f6 blue lighten-2">
                        <span>Upload Image</span>
                        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
            </div>
            <button className="btn #64b5f6 blue lighten-2"
            onClick={() => postDetails()}
            >Submit Post</button>
            
            
        </div>
    )
}

export default CreatePost
    