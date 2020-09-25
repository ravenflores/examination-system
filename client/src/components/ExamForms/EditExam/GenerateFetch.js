import React,{useState} from 'react'

export default function GenerateFetch(props) {
    const [state,setState]=useState()

    fetch(`/myitems/${props.item._id}`,{
        headers:{
            "Authorization": "Bearer "+localStorage.getItem("jwt")
        }
    })
    .then(res => res.json())
    .then(result => {
        console.log(result)
        setState(result.mypost)

    })
   
    return state
}
