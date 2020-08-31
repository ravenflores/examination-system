import React,{useState,useContext} from 'react'
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

function Login() {
    const{state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [emailStats,setEmailStats] = useState("")
    const [msg,setMsg] = useState("")
    const [msgstats,setMsgstats] = useState(false)
    const [disable,setDisable] = useState(false)
    
    const PostData =(e) =>{
        e.target.disabled = true
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
            setEmailStats('Invalid email try again')
            e.target.disabled = false  
            return
        }
        
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({   
                password,
                email

            })
        }).then(res => res.json())
        .then(data =>{
            console.log(data)
            if(data.error){
               setEmailStats(data.error)
               setDisable(false)
            }
            else{
                localStorage.setItem("jwt",data.token) 
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                history.push('/')
            }
        },e.target.disabled = disable)
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
               
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
                maxLength ="200"
                value= {password}
                onChange = {(e) =>setPassword(e.target.value)} />
                <button className="btn #64b5f6 blue lighten-2"
                onClick = {(e)=>PostData(e)}
                >Log In</button>
                <h5>
                    <Link to="/signup">Do not have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Login
