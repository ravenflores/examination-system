import React,{useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { DesktopAccessDisabledSharp } from '@material-ui/icons';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

function CreatePost() {
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const [msgstats,setMsgstats] = useState(false)
    const [dstats,setDStats] = useState(true)
    const [msg,setMsg] = useState("")
    
    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          '& > * + *': {
            marginTop: theme.spacing(2),
          },
        },
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

    const urlFetch = (url,e) => {
        fetch("/createpost",{
            method:"post",  
            headers:{
                "Content-Type": "application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({   
                title,
                body,
                picture:url

            })
        }).then(res => res.json())
        .then(data =>{ 
            console.log(data.error)
            if(data.error){
                
                setMsg(data.error)
                e.disabled = false
                
            }
            else{
                handleClose()
                setMsg("Post Created!")
                setMsgstats(true)
                setTimeout(()=>{
                    history.push('/')
                },1500)
                
            }
        })
    }


    const postCreate = (e) => {
        handleToggle()
        console.log(e)
        e.disabled = true
        if(!title || !body){
           setMsg("please add all the field")
           e.disabled = false
        }
        else{
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
                urlFetch(data.url,e)
                
            })
            .catch(err => {
    
    
                console.log(err)
                return
            })
       
        }
        

   
    }
    

    return (
        <>
        <Backdrop className={classes.backdrop} open={open}>
             <CircularProgress color="inherit" />
       </Backdrop>
        {msgstats?
         <div className={classes.root}>
         <Alert variant="filled" severity="success">
             {msg}
         </Alert>
        </div>:null
        }
        <div className="card input-field" style={{
            margin:"30px auto",
            maxWidth: "500px",
            padding: "20px",
            textAlign: "center"
            
        }}>
            <input type= "text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <TextareaAutosize aria-label="empty textarea" rowsMin="4"  placeholder="Body" value={body} onChange={(e)=>setBody(e.target.value)} />
            {msgstats?null:<a id="emailstate">{msg}</a>}
            
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
                onClick={(e)=>postCreate(e.target)}
                >Post</button>
            
            
        </div>
        </>
    )
}

export default CreatePost
    