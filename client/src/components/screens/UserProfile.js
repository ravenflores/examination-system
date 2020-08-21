import React,{useEffect,useState,useContext} from 'react'
import { UserContext } from '../../App'
import {useParams} from 'react-router-dom'
 
function Profile() {
  
    const [userProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showFollow,setShowFollow] = useState(true)
    console.log(userid)
    useEffect(()=>{
    fetch(`/user/${userid}`,{
        headers:{
            "Authorization": "Bearer "+localStorage.getItem("jwt")
        }
    })
    .then(res => res.json())
    .then(result => {
        console.log(result)
        setProfile(result)
        setShowFollow(result.status)
    }) 
    },[])

    const followUser = () =>{
        fetch(`/follow`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followid:userid
            }) 
        }).then(res => res.json())
        .then(data => {
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            console.log(data)
            setProfile((prevstate)=>{
                return {
                    ...prevstate,
                    user:{
                        ...prevstate.user,
                        followers:[...prevstate.user.followers,data._id]
                    } 
                }
            })

            setShowFollow(false)
        })

    }

    const unfollowUser = () =>{
        fetch(`/unfollow`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowid:userid
            }) 
        }).then(res => res.json())
        .then(data => {
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            console.log(data)
            setProfile((prevstate)=>{
                const newFollower = prevstate.user.followers.filter(item => item != data._id)
                return {
                    ...prevstate,
                    user:{
                        ...prevstate.user,
                        followers:newFollower
                    } 
                }
            })
            setShowFollow(true)
        })

    }
   
    return (
        <>
        {userProfile ? 
        
        <div style={{maxWidth:"550px",margin: "0px auto"}}>
            <div style = {{
                display:"flex",
                justifyContent:"space-around",
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div>
                    <img style= {{width: "160px",height:"160px",borderRadius:"80px"}}
                    src="https://images.unsplash.com/photo-1522039553440-46d3e1e61e4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"
                    />
                </div>
                <div >
                    <h4> {userProfile.user.name} </h4>
                    <h5> {userProfile.user.email} </h5>
                    <div style = {{display: "flex", justifyContent:"space-between",width:"108%"}}>
                    <h6>{userProfile.posts.length} posts</h6>
                    <h6>{userProfile.user.followers.length} followers</h6>
                    <h6>{userProfile.user.following.length} following</h6>
                    </div>
                    {
                        showFollow?
                         <button style={{
                             margin:"10px"
                         }} className="btn #64b5f6 blue lighten-2" onClick = {()=>followUser() }>Follow</button>
                            :
                         <button style={{
                            margin:"10px"
                        }} className="btn #64b5f6 blue lighten-2" onClick = {()=>unfollowUser()}>UnFollow</button>
                    }
                   
                    
                    
                </div>

            </div>
            <div className="gallery">
                {  
                    userProfile.posts.map(item => {
                        return(
                            <img key={item._id} className = "item" src= {item.photo} />

                        )
                    })
                }
              </div>

        </div>
        
        : <h2>loading...</h2>}
        
        </>
    )
}

export default Profile
