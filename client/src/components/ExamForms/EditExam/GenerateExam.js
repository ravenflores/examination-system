import React, { useState, useCallback, useEffect,useRef } from "react";
import Box from "@material-ui/core/Box";
import { useForm } from "react-hook-form";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { setDayOfYear } from "date-fns/fp";
//icons
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { getDate } from "date-fns";
import moment from 'moment';
import Fab from '@material-ui/core/Fab';

//component

const useStyles = makeStyles((theme) => ({
  root: { 
    height: 'max-content',
    margin: '20 auto',
    
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
    '& > *': {
      margin: theme.spacing(1),
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
  details: {
    verticalAlign: 'middle'
  }
}));

const grades = [
  { grade: "7",id: 1},
  { grade: "8",id: 2},
  { grade: "9",id: 2},
 ]
const sections = [
  { section: "Queen Of Heaven",id: 7},
  { section: "Queen Of Prophets",id: 8},
  { section: "Queen Of Love",id:9},
  
 ]
 const subjects = [
  { subject: "English",id: 1},
  { subject: "Math",id: 2},
  { subject: "Science",id:3},
  { subject: "Filipino",id:3},
  { subject: "Computer",id:3},
  { subject: "PE",id:3},
  
 ]

const types = [
  { type: "Multiple Choice",id: 1},
  { type: "Identification",id:2},
  { type: "True or False",id:3},
  { type: "Photo Guess",id:4},
  { type: "Enumeration",id:5},
  { type: "Essay",id:6},
 ]

 const difficulty = [
  { type: "Easy",id: 1},
  { type: "Medium",id:2},
  { type: "Hard",id:3},
  { type: "Very Hard",id:4},
  
 ]



const matchsection = (a) => {
    let b = 4

    sections.map((item,index)=> {
        
        if(item.section == a)
        {
  
          b = index
        }
      })

      return b
      
  }


  const matchsubject = (a) => {
    let b = 4

    subjects.map((item,index)=> {
        
        if(item.subject == a)
        {
  
          b = index
        }
      })

      return b
      
  }
  
  const matchgrade = (a) => {
    let b = 4

    grades.map((item,index)=> {
        
        if(item.grade == a)
        {
  
          b = index
        }
      })

      return b
      
  }

function CreateExam(props) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(props.item.date);
  const { register, handleSubmit, errors } = useForm();
  const [examId,setExamId] = useState()
  const [partStatus,setPartStatus] = useState(false)
  const onSubmit = (data, e) => console.log(data, e);
  const onError = (errors, e) => alert("Form is invalid! \nPlease open Parts Accordion if you missed One \n" + e);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  console.log(props)
  const saveExam = (data) =>
{
if(examId){
  console.log("meron")
  
}
else{
  console.log("wala")


  fetch("/createexam",{
    method:"post",  
    headers:{
        "Content-Type": "application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
    body:JSON.stringify({   
      examname:data.examname,
      grade: data.grade,
      section: data.section,
      durationhrs: data.durationhrs,
      durationmins: data.durationmins,
      date: selectedDate,
      subject: data.subject,

    })
}).then(res => res.json())
.then(data =>{ 
    console.log(data.error)
    if(data.error){
        alert(data.error)
        
    }
    else{
       
        alert("Exam Created!")
        console.log(data.exam._id)
        setExamId(data.exam._id)
        handlePart()

        
    }
})
}
}

useEffect(() => {
  if (setPartStatus) {
    console.log("eto");
    console.log(partStatus);
    
  }
}, [partStatus]);

const handlePart = () =>{
  if(partStatus){
    setPartStatus(false)
  }
  else{
    setPartStatus(true)
  }

}

  return (
    <>
    

      <div style={{ width: "100%" }}>
      <form onSubmit={handleSubmit((data) => saveExam(data))} >
      <Card className={classes.root} variant="outlined">
      <CardContent style={{padding:0}}>
          <Box
            display="flex"
            flexDirection="row"
            m={1}
            bgcolor="background.paper"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="flex-start" 
            alignContent="flex-start"
            css={{borderRadius:'6px'}}

          >
            <Box p={0} m={1} css={{ width: 325 }}  flexGrow={1}>
              <TextField
                required
                id="outlined-basic"
                label="Exam Name"
                name="examname"
                type="text"
                defaultValue={props.item.examname}
                variant="outlined"
                inputRef={register()}
                fullWidth
                size="medium"
              />
            </Box>
            <Box p={0} m={1} css={{ width: 300 }} flexGrow={1}>
              <Autocomplete
                size="medium"
                id="combo-box-demo"
                options={subjects}
                getOptionLabel={(subjects) => subjects.subject}
                style={{ width: 'auto' }}
                value={subjects[matchsubject(props.item.subject)]}
                type="text"
                renderInput={(params) => (
                  <TextField
                    size="medium"
                    required
                    {...params}
                    label="Subject"
                    name="subject"
                    type="text"
                    inputRef={register()}
                    variant="outlined"
                    defaultValue={props.item.subject}
                    fullWidth
                  />
                )}
              />
            </Box>
            <Box p={0} m={1} css={{ width: 100 }} flexGrow={1}>
              <Autocomplete
                size="medium"
                id="combo-box-demo"
                options={grades}
                getOptionLabel={(grades) => grades.grade}
                style={{ width: 'auto' }}
                value={grades[matchgrade(props.item.grade)]}
                type="text"
                renderInput={(params) => (
                  <TextField
                    size="medium"
                    required
                    {...params}
                    label="Grade"
                    name="grade"
                    type="text"
                    inputRef={register()}
                    defaultValue={props.item.subject}
                    variant="outlined"
                  />
                )}
              />
            </Box>

            <Box p={0} m={1} css={{ width: 300 }} flexGrow={1}>
              <Autocomplete
                size="medium"
                id="combo-box-demo"
                options={sections}
                getOptionLabel={(sections) => sections.section}
                style={{ width: 'auto' }}
                value={sections[matchsection(props.item.section)]}
                name="Section"
                type="text"
                renderInput={(params) => (
                  <TextField
                    size="medium"
                    required
                    {...params}
                    label="Section"
                    name="section"
                    type="text"
                   
                    inputRef={register()}
                    variant="outlined"
                  />
                )}
              />
            </Box>
            
            <Box p={0} m={1} css={{ width: 80 }}  flexGrow={1}>
              <TextField
                size="medium"
                required
                id="outlined-basic"
                label="Hrs"
                type="number"
                name="durationhrs"
                variant="outlined"
                fullWidth
                defaultValue={props.item.durationhrs}
                inputRef={register()}
              />
            </Box>
            <Box p={0} m={1} css={{ width: 80 }} flexGrow={1}>
              <TextField
                size="medium"
                required
                id="outlined-basic"
                label="Mins"
                type="number"
                name="durationmins"
                defaultValue={props.item.durationmins}
                variant="outlined"
                fullWidth
                inputRef={register()}
              />
            </Box>

            <Box  css={{ width: 340 }} flexgrow={1}
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="flex-start" 
            alignContent="flex-start">
            <Box p={0} m={1} css={{ width: 150 }} flexgrow={1}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              
                  <KeyboardDatePicker
                    margin="none"
                    width="auto"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    name="date"
                    type="text"
                    value={selectedDate}
                    inputRef={register()}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="medium"
                    style={{width:"auto"}}
                  />
                
               

                
              </MuiPickersUtilsProvider>
            </Box><Box p={0} m={1} css={{ width: 150 }} flexgrow={1} >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
            
              <KeyboardTimePicker
                    size="medium"
                    margin="none"
                    width="auto"
                    id="time-picker"
                    label="Time picker"
                    name="time"
                    type="text"
                    value={selectedDate}
                    onChange={handleDateChange}
                    inputRef={register()}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                    style={{width:"auto"}}
                />
          
              </MuiPickersUtilsProvider>
            </Box>
            </Box>
          </Box>
      </CardContent>
      </Card>

      {/* <div className={classes.acc}>
      <Box 
      display="flex"
      flexDirection="row"
      p={1}
      m={1}
      flexWrap="wrap"
      justifyContent="center"
      alignItems="flex-start"
      alignContent="flex-start">
        <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<AddIcon />}
        type="submit"
      >
        Add Parts
      </Button>
      </Box>
      </div> */}

      
      </form>
      {/* {
        partStatus? <Parts part= {true} examId={examId} setParts={()=>handlePart()} /> : <Parts part= {false} />
      } */}
     
      
     
      </div>
      
    </>
  );
}


export default CreateExam;
