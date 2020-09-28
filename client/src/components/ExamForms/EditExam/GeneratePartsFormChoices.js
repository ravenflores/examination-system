import React,{useEffect,useState} from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Autocomplete from "@material-ui/lab/Autocomplete";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";

import CardHeader from '@material-ui/core/CardHeader';

import InputFieldsText from "./GenerateInputFields";


export default ({ nestIndex, control, register, datas }) => {
    
  const [data,setData] = useState(datas)
    
    const { fields, remove, append } = useFieldArray({
      control,
      name: `questions[${nestIndex}].choices`
    });
    const useStyles = makeStyles((theme) => ({
      root: {
        width: "inherit",
      },
    }));
    const classes = useStyles();
    const [value, setValue] = React.useState("female");
    const handleChange = (event) => {
      setValue(event.target.value);
    };


    useEffect(()=>{
        if(fields.length == 0)
        {
            append()
        }
    },[fields])


 const ch = (indexx) =>{
   try {
    if(data[nestIndex].choices[indexx].choice === undefined)
     {
      //  console.log("mali")
       return false
     }
     else{
      // console.log("tama")
      return true
     }
    
   }
   catch(e){
    // console.log("malicatch")
    return false
   }
 }

 const q = () =>{
   try {
    if(data[nestIndex].question === undefined)
     {
      //  console.log("mali")
       return false
     }
     else{
      // console.log("tama")
      return true
     }
    
   }
   catch(e){
    // console.log("malicatch")
    return false
   }
 }
 
 const a = () =>{
   try {
    if(data[nestIndex].answer === undefined)
     {
      //  console.log("mali")
       return false
     }
     else{
      // console.log("tama")
      return true
     }
    
   }
   catch(e){
    // console.log("malicatch")
    return false
   }
 }

 const deleteChoice = (index) => {
  try{

   console.log(index)
   console.log(data[nestIndex]._id)
   fetch(`/deletechoice/${data[nestIndex]._id}/${data[nestIndex].choices[index]._id}`,{
    method: "put",
    headers: {
        "Content-Type":"application/json",
        "Authorization" : "Bearer "+localStorage.getItem("jwt")
    }
}).then(res => res.json())
.then(result => {
    console.log(result)
    console.log(data)

    const newData  = data.map(item => {
        if(item._id == result._id){
            return result
        }
        else{
            return item
        }
    })
    console.log(newData)
     setData(newData)
})

   remove(index)

  }
  catch{
   remove(index)
  }
  
}
const testChoice = (index) => {
  try{
   console.log(data[nestIndex].choices.length)
   return true

  }
  catch{
   return false
  }
  
}


const appen = (times) => {
  console.log(times);
  console.log(Number(fields.length));
  if(times > fields.length){
    if(times <= 10){
      let a = (times - Number(fields.length))
      console.log(a);
      const elements = [];

      while (a > 0) {
        elements.push({ name: `questions[${nestIndex}].choices` });
        a--;
      }
      append(elements);
    }
    else{
      alert("maximum of 10 choices only!")
    }

  }
  else {
    if(times >= 1){
      let a = (Number(fields.length)-times)
      console.log(a);
      const elements = [];
      let b = (fields.length-1)
      while (a > 0) {
        
        elements.push(b);
        b--;
        a--;
      }
      console.log(elements)
      remove(elements);
      
    }
    else{
      alert("invalid input")
    }
  }
  
  
};




useEffect(()=> {
  if(setData){
    if(testChoice()){
      appen(data[nestIndex].choices.length)
    }
       
  }
},[data]) 

    return (
      <>
        
          <CardContent style={{width:'inherit'}}>
            <TextField
              name={`questions[${nestIndex}].question`}
              size="medium"
              required
              id="outlined-basic"
              inputRef={register()}
              label="question"
              type="text"
              defaultValue={q()?data[nestIndex].question:null}
              variant="outlined"
              fullWidth
               // make sure to set up defaultValue
            />
  
            <div style={{width:'inherit'}}>
                   <InputFieldsText
                    size="medium"
                    required
                    name={`questions[${nestIndex}].answer`}
                    variant="outlined"
                    label="answer"
                    fullWidth
                    defaultValue={a()?data[nestIndex].answer:null}
                    inputRef={register()}
                    margin='dense'
  
                  />
                  {
                      fields.length == 0?append():null

                  }
                  
                   {fields.map((items, indexx) => {
                  return (
                    <div key={items.id} name={nestIndex} style={{display:'flex'}}>
                       <div style={{width:'55%'}}>
                          <InputFieldsText
                            size="medium"
                            required
                            name={`questions[${nestIndex}].choices[${indexx}].choice`}
                            variant="outlined"
                            label={`choice ${indexx+1}`}
                            defaultValue={  ch(indexx)?data[nestIndex].choices[indexx].choice:null}
                            fullWidth
                            inputRef={register()}
                            margin='dense'
                            
                          />
                        </div>
                        <div style={{width:'45%'}}>
                            {
                                 indexx == 0?null: <Button className='parts-btn1' variant="contained" onClick={() => deleteChoice(indexx)}>DELETE</Button>
                            }
                         
                            
                        </div>
                    </div>
                    
                     
                  );
                })}

                <div>
                         <Button onClick={() => append()}
                          variant="contained"
                          color="secondary"   
                          className='parts-btn2'
                          >Add</Button>
                </div>
                  
              
            </div>
          </CardContent>
      </>
    );
  }
  