// FormElements.jsx

import React,{useState,useEffect} from "react";
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
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import CardHeader from '@material-ui/core/CardHeader';
import MultipleChoice from './GeneratePartsFormChoices';
import { DataUsageRounded } from "@material-ui/icons";
import { STATES } from "mongoose";
import { ClickAwayListener } from "@material-ui/core";

 function PartsDetails({ control, register, setValue,partNum, getValues, watch,item }) {
 
  const  [data,setData]  = useState({})
  
  useEffect(()=>{
    console.log(item)
    fetch(`/myitems/${item._id}`,{
        headers:{
            "Authorization": "Bearer "+localStorage.getItem("jwt")
        }
    })
    .then(res => res.json())
    .then(result => {
        console.log(result.mypost)
        setData(result.mypost)
    })
    },[]) 

  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "questions"
  }); 
  


  const useStyles = makeStyles((theme) => ({
    root: {
      width: 'auto',
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    container: {
      display: "flex",
      justifyContent: "center",
    },
    text: {
      color: "blue",
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    acc: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    button: {
      margin: theme.spacing(1),
    },
    fab: {
      "& > *": {
        margin: theme.spacing(1),
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
    },
    details: {
      verticalAlign: "middle",
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    card: {
      width: "inherit",
      marginTop:"8px",
    },
  }));
  const classes = useStyles();

  const appen = (times) => {
    console.log(times);
    console.log(Number(fields.length));
    if(times > fields.length){
      if(times <= 20){
        let a = (times - Number(fields.length))
        console.log(a);
        const elements = [];
  
        while (a > 0) {
          elements.push({ name: "questions" });
          a--;
        }
        append(elements);
      }
      else{
        alert("maximum of 20 items only!")
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
        console.log("invalid input")
      }
    }
    
    
  };

  
  

  useEffect(()=> {
      if(setData){
        appen(data.length)
      }
  },[data]) 

  const GreenRadio = withStyles({
    root: {
      color: green[400],
      "&$checked": {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  const types = [
    { type: "Multiple Choice", id: 1 },
    { type: "Identification", id: 2 },
    { type: "True or False", id: 3 },
    { type: "Photo Guess", id: 4 },
    { type: "Enumeration", id: 5 },
    { type: "Essay", id: 6 },
  ];

  const difficulty = [
    { type: "Easy", id: 1 },
    { type: "Medium", id: 2 },
    { type: "Hard", id: 3 },
    { type: "Very Hard", id: 4 },
  ];


  const matchtype = (a) => {
    let b = 4

    types.map((item,index)=> {
        
        if(item.type == a)
        {
  
          b = index
        }
      })

      return b
      
  }
  const matchdifficulty = (a) => {
    let b = 4

    difficulty.map((item,index)=> {
        
        if(item.type == a)
        {
  
          b = index
        }
      })

      return b
      
  }

  const deleteItem = (index) => {
   try{

    console.log(index)
    console.log(data[index]._id)
    fetch(`/deleteitem/${data[index]._id}`,{
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
        setData (newData)
    })

    remove(index)

   }
   catch{
    remove(index)
   }
   
}

  return (
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Box
            display="flex"
            flexDirection="row"
            bgcolor="background.paper"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="flex-start"
            alignContent="flex-start"
            css={{ borderRadius: "6px" }}
          >
            <div style={{ width: "100%" }} key={partNum + "div"}>
            <Card className={classes.card} variant="outlined">
              <Box
                display="flex"
                flexDirection="row"
                bgcolor="background.paper"
                flexWrap="wrap"
                justifyContent="center"
                alignItems="flex-start"
                alignContent="flex-start"
              >
                <Box p={0} m={1} css={{ width: 180 }} flexGrow={1}>
                              <Autocomplete
                                size="medium"
                                id="combo-box-demo"
                                options={types}
                                getOptionLabel={(types) => types.type}
                                style={{ width: 'auto' }}
                                type="text"
                                value={types[matchtype(item.type)]}
                                renderInput={(params) => (
                                  <TextField
                                    size="medium"
                                    required
                                    {...params}
                                    label="Select Exam Types"
                                    name={"type"}
                                    type="text"
                                    inputRef={register()}
                                    variant="outlined"
                                    fullWidth
                                  />
                                )}
                              />
                </Box>
                
              <Box p={0} m={1} css={{ width: 180 }} flexGrow={1}>
                    <TextField
                      size="medium"
                      required
                      id="outlined-basic"
                      label="Set Points Per Item"
                      type="number"
                      defaultValue={item.points}
                      name={"points"}
                      variant="outlined"
                      fullWidth
                      inputRef={register()}
                    />
              </Box>
              
              <Box p={0} m={1} css={{ width: 180 }} flexGrow={1}>
                              <Autocomplete
                                size="medium"
                                id="combo-box-demo"
                                options={difficulty}
                                getOptionLabel={(difficulty) => difficulty.type}
                                style={{ width: 'auto' }}
                                name="Grade"
                                type="text"
                                value={difficulty[matchdifficulty(item.difficulty)]}
                                renderInput={(params) => (
                                  <TextField
                                    size="medium"
                                    required
                                    {...params}
                                    label="difficulty"
                                    name={"difficulty"}
                                    type="text"
                                    inputRef={register()}
                                    variant="outlined"
                                    fullWidth
                                  />
                                )}
                              />
                </Box>
                <Box p={0} m={1} css={{ width: 180 }} flexGrow={1}>
                  <TextField
                    size="medium"
                    required
                    id="outlined-basic"
                    label="Instructions"
                    type="number"
                    name={"instructions"}
                    variant="outlined"
                    defaultValue={item.instructions}
                    multiline
                    fullWidth
                    inputRef={register()}
                  />
                </Box>
              </Box>
            </Card>
            </div>

            <div style={{ width: "100%" }} key={partNum + "div2"}>
            {fields.map((item, index) => {
             
                return (
                  <div key={item.id}>
                     <Card className={classes.card} name={`questions[${index}].card`} variant="outlined">
                      <CardHeader
                            AnimationEffect
                            action={
                              <Button variant="contained" onClick={() => deleteItem(index)}>DELETE</Button>
                            }
                            title={""+(index+1)}
                            // subheader="September 14, 2016"
                          />
                       <MultipleChoice nestIndex={index} {...{ control, register,datas:data }} />
                        
                    </Card> 
                  </div>
                );
              })} 
            </div>

            <Box
              key={partNum + "div3"}
              display="flex"
                flexDirection="row"
                p={1}
                m={1}
                bgcolor="background.paper"
                flexWrap="wrap"
                justifyContent="center"
                alignItems="flex-start"
                alignContent="flex-start"
            >
         <div style={{width:65,marginTop:7}} >

         
          <TextField
                      required
                      id="outlined-basic"
                      label=""
                      type="number"
                      name= {"items"}
                      variant="outlined"
                      size="small"
                      fullWidth
                      defaultValue={item.items}
                      InputProps={{
                        inputProps: { 
                            max: 20, min: 1 
                        }
                    }}
                      inputRef={register()}
                    /> 
          </div> 
                    
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => appen(watch('items'))}  
            >
              Set Items
            </Button>
             
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
            
            
            </Box>
          </Box>
        </CardContent>
      </Card>
   
  );
}



export default PartsDetails
