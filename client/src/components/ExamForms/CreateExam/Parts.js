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


import PartsDetails from './Forms'



const defaultValues = {
  questions: [
    {
      name: "questions",
      choices: [{ choice: "field1"}]
    }
  ],

};



export default function Parts(props) {

  const {
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    setValue
  } = useForm({defaultValues});
  const onSubmit = (data) => {
    console.log("examId: "+props.examId)
    console.log("data", data);
  } 


  return (
    <div>
      {
        props.part?
        <form onSubmit={handleSubmit(onSubmit)}>
        
  
        <PartsDetails
          {...{ control, register, defaultValues, getValues, setValue, errors }}
        />
  
        <input type="submit" />
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