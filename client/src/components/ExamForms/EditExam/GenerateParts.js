import React, { useState, useCallback, useEffect,useRef } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//icons
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';


import PartsDetails from './GeneratePartsForm'



const defaultValues = {
  // questions: [
  //   {
  //     name: "questions",
  //     choices: [{ choice: "field1"}]
  //   }
  // ],
};

 
 




export default function Parts(props) {
 
  const item = props.item
  const {
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    setValue,
    watch,
  } = useForm({defaultValues});

  const onSubmit = (data) => {
    console.log("examId: "+props.examId)
    console.log(data);
    console.log(item._id)
    
    updateParts(data)
    // saveParts(data)

  } 

 
  
   

 

  const [partId,setPartId] = useState()

  const deleteallitems = (data,partId) => {
    fetch(`/deleteallitems/${partId}`,{
        method: "delete",
        headers: {
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+localStorage.getItem("jwt")
        }
    }).then(res => res.json())
    .then(result => {
        console.log(result)
        saveItems(data,partId)
        // const newData  = data.map(item => {
        //     if(item._id == result._id){
        //         return result
        //     }
        //     else{
        //         return item
        //     }
        // })
        // console.log(newData)
        //  setData(newData)
    })
    
}

  const saveParts = (data) =>
  {
  if(!props.examId){
    console.log("meron")
    
  }
  else{
    console.log("wala")
  
    console.log(props.examId)

    fetch("/createparts",{
      method:"post",  
      headers:{
          "Content-Type": "application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({   
        type: data.type,
        items: data.items,
        points: data.points,
        difficulty: data.difficulty,
        instructions: data.instructions,
        examId: props.examId
  
      })
  }).then(res => res.json())
  .then(datas =>{ 
      console.log(datas.error)
      if(datas.error){
          alert(datas.error)
          
      }
      else{
         

          console.log(datas.parts._id)
          saveItems(data,datas.parts._id)
          
      }
  })
  }
  }

  const saveItems = (data,pId) =>
  {
  if(partId){
    console.log("wala")
    
  }
  else{
    console.log("meron")
  
   data.questions.map((item, index) =>{
        console.log(item)
        console.log(pId)
        fetch("/createitems",{
          method:"post",  
          headers:{
              "Content-Type": "application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({   
            question:item.question,
            answer: item.answer,
            choices: item.choices,
            points: "1",
            partsId:pId,
      
          })
      }).then(res => res.json())
      .then(data =>{ 
          console.log(data.error)
          if(data.error){
              alert(data.error)
              
          }
          else{
              console.log(data)
      
              
          }
      })

   })
    
  }
  
  }
  
  const deleteItems = (data,pId) =>
  {
  if(partId){
    console.log("wala")
    
  }
  else{
    console.log("meron")
  
    deleteallitems(item._id)
    
  }
  
  }


  const updateParts = (data) => {
    console.log(data.items)
    console.log(data.questions.length)
    fetch(`/updateparts/${item._id}`,{
        method: "put",
        headers: {
            "Content-Type":"application/json",
            "Authorization" : "Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          type: data.type,
          items: data.questions.length,
          points: data.points,
          difficulty: data.difficulty,
          instructions: data.instructions,
          examId: props.examId
        })
    }).then(res => res.json())
    .then(result => {
    
        console.log(result)
        deleteallitems(data,item._id)
        // const newData  = data.map(item => {
        //     if(item._id == result._id){
        //         console.log(state._id)
        //         return result
        //     }
        //     else{
        //         return item
        //     }
        // })
        //  setData(newData)
         
    },
    //  setEdit("")
     
     )

}
  return (
    <div>
      {
        props.part?
        <form onSubmit={handleSubmit(onSubmit)}>
        <PartsDetails
          {...{ control, register, defaultValues, getValues, setValue, errors,watch,item }}
        />
  
      </form>
      :null
      }
        
      
         {/* {
          props.part == true?<form> {createCard()} </form>: null
        }
        <div style={{marginBottom:'30px',marginTop:'40px'}}>
        {
          newDynamicElem()
        }
        </div> */}
        

        
      
    </div>
  )




 
}