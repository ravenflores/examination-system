import React,{useState} from 'react'
import M from 'materialize-css'
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import SimpleAlerts from '../Alert'
import TextField from '@material-ui/core/TextField'; 
import {BrowserRouter, Route,Switch,useHistory,Link} from 'react-router-dom'
function Login() {
    const history = useHistory()
    const [name,setName] = useState("")
    const [surname,setSurname] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [disable,setDisable] = useState(false)
    const [url,setUrl] = useState("")
    const [emailStats,setEmailStats] = useState("")
    const [msg,setMsg] = useState("")
    const [msgstats,setMsgstats] = useState(false)
    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          '& > * + *': {
            marginTop: theme.spacing(2),
          },
        },
      }));

    const classes = useStyles();
   
   
    const PostData =(e) =>{
        e.target.disabled = true
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
            console.log('invalid')
            setEmailStats('Invalid email try again')
            e.target.disabled = false  
            return
        }

        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,
                surname,   
                password,
                email,
                photo:"https://images.unsplash.com/photo-1522039553440-46d3e1e61e4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"

            })
        }).then(res => res.json())
        .then(data =>{
            if(data.error){
                console.log(data.error)
            setDisable(false)
            setEmailStats(data.error)
            return
            }
            else{
               setMsg(data.message)
               setMsgstats(true)
               setTimeout(()=>{
                history.push('/login')
            },1500)
               
            }
        },  e.target.disabled = disable
        
        )

       


    }

    const postDetails = (e) =>{

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

            })
            .catch(err => {
    
    
                console.log(err)
            })
        
        
       

        
        
        
    }

    return (
        <>
        {msgstats?
         <div className={classes.root}>
         <Alert variant="filled" severity="success">
             {msg}
         </Alert>
        </div>:null
        }
        
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                type="text"
                placeholder="firstname"
                value = {name}
                onChange = {(e) =>setName(e.target.value)}
                />
                <input
                type="text"
                placeholder="lastname"
                value = {surname}
                onChange = {(e) =>setSurname(e.target.value)}
                />

                <input
                type="text"
                placeholder="email"
                value={email}
                maxLength="200"
                onChange = {(e) =>setEmail(e.target.value)} />
                <a id="emailstate">{emailStats}</a>
                <input
                type="password" 
                placeholder="password" 
                value= {password}
                onChange = {(e) =>setPassword(e.target.value)} />
                <button className="btn #64b5f6 blue lighten-2"
                onClick={(e)=>PostData(e)}
                >Signup</button>
                
               
                <h5>
                    <Link to="/login">Already have an account?</Link>
                </h5>
            </div>
        </div>
        </>
    )
}

export default Login
