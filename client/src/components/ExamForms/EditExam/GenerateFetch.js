import React,{useState} from 'react'


export const deletes = (props,data,setData,setDialog) => {
    
    fetch(`/deleteexam/${props}`,{
        method: "delete",
        headers: {
            Authorization : "Bearer "+localStorage.getItem("jwt")

        }
    }).then(res => res.json())
    .then(result => {
        console.log(result)
        console.log(data)
        
        const newData = data.filter(item => {
            return item._id !== result._id
        })
        setData(newData) 
          
        
    },setDialog(false))
}
