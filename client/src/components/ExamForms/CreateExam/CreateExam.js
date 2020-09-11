import React, { useState, useCallback, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { useForm } from "react-hook-form";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
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
}));

const accord = (classes, expanded, handleChange, register, part) => {
  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>Part 1</Typography>
        <Typography className={classes.secondaryHeading}>
          Multiple Choice
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
          Aliquam eget maximus est, id dignissim quam.
        </Typography>
        <TextField
          size="small"
          required
          id="outlined-basic"
          label="Exam Name"
          name={part}
          type="text"
          variant="outlined"
          inputRef={register}
          fullWidth
        />
      </AccordionDetails>
    </Accordion>
  );
};


function CreateExam() {
  const classes = useStyles();
  const [parts, setParts] = useState(0);
  const [dynamicParts, setDynamicParts] = useState([]);
  const [dynamicTypes, setDynamicTypes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [expanded, setExpanded] = useState(false);
  const [partNum, setPartNum] = useState(1);
  const { register, handleSubmit, errors } = useForm();

  const handleClick = useCallback(() => {
    setParts(parts + 1);
    console.log("Clicked!");
  }, [parts]);

  useEffect(() => {
    if (setDynamicParts) {
      console.log("eto");
      console.log(dynamicParts);
    }
  }, [dynamicParts]);

  

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : true);
  };
  

  const addEl = useCallback(() => {
    if (setDynamicParts) console.log("Clicked!");
    return;
  }, [parts]);

  const useMountEffect = (fun) => useEffect(fun, [])

  const addElement = () => {
    // Creates the dynamic paragraph
   if(partNum <= 10) {
    console.log(selectedDate)
    const newDynamicElem = (
        <>

          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Part {partNum}</Typography>
            </AccordionSummary>
            <AccordionDetails>
               
                  <div style={{ width: "100%" }}>
                            <Box
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
  
                  <Box p={0} m={1} css={{ width: 200 }} flexGrow={1}>
                                <Autocomplete
                                  size="small"
                                  id="combo-box-demo"
                                  options={types}
                                  getOptionLabel={(types) => types.type}
                                  style={{ width: 200 }}
                                  name="Grade"
                                  type="text"
                                  renderInput={(params) => (
                                    <TextField
                                      size="small"
                                      required
                                      {...params}
                                      label="Select Exam Types"
                                      name="partExamType"
                                      type="text"
                                      inputRef={register}
                                      variant="outlined"
                                    />
                                  )}
                                />
                  </Box>
                  <Box p={0} m={1} css={{ width: 200 }} flexGrow={1}>
                      <TextField
                        size="small"
                        required
                        id="outlined-basic"
                        label="Set number of Items"
                        type="number"
                        name="partNoOfItems"
                        variant="outlined"
                        fullWidth
                        inputRef={register}
                      />
                </Box>
                <Box p={0} m={1} css={{ width: 200 }} flexGrow={1}>
                      <TextField
                        size="small"
                        required
                        id="outlined-basic"
                        label="Set Points Per Item"
                        type="number"
                        name="partPointsPerItem"
                        variant="outlined"
                        fullWidth
                        inputRef={register}
                      />
                </Box>
                
                <Box p={0} m={1} css={{ width: 200 }} flexGrow={1}>
                                <Autocomplete
                                  size="small"
                                  id="combo-box-demo"
                                  options={difficulty}
                                  getOptionLabel={(difficulty) => difficulty.type}
                                  style={{ width: 200 }}
                                  name="Grade"
                                  type="text"
                                  renderInput={(params) => (
                                    <TextField
                                      size="small"
                                      required
                                      {...params}
                                      label="difficulty"
                                      name="difficulty"
                                      type="text"
                                      inputRef={register}
                                      variant="outlined"
                                    />
                                  )}
                                />
                  </Box>
                  <Box p={0} m={1} css={{ width: 400 }} flexGrow={1}>
                      <TextField
                        size="small"
                        required
                        id="outlined-basic"
                        label="Set Instructions"
                        type="number"
                        name="partSetInstructions"
                        variant="outlined"
                        multiline
                        fullWidth
                        inputRef={register}
                      />
                </Box>
                  </Box>
                  </div>
            </AccordionDetails>
          </Accordion>
        </>
      );
      // adds it to the state
      setDynamicParts(() => [...dynamicParts, newDynamicElem]);
      setPartNum(partNum+1)
    } else {
     alert("Maximum Parts Reached!")
   }
    
 
  };

  const onSubmit = (data, e) => console.log(data, e);
  const onError = (errors, e) => alert("Form is invalid! \nPlease open Parts Accordion if you missed One \n" + e);
  
  useMountEffect(addElement)
  return (
    <>
     <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)),onError)}>
     <Container>
      <div style={{ width: "100%" }}>
       
          <Box
            display="flex"
            flexDirection="row"
            p={1}
            m={1}
            bgcolor="background.paper"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="flex-start" 
            alignContent="flex-start"
            css={{borderRadius:'6px'}}

          >
            <Box p={0} m={1} css={{ width: 500 }}  flexGrow={1}>
              <TextField
                required
                id="outlined-basic"
                label="Exam Name"
                name="examname"
                type="text"
                variant="outlined"
                inputRef={register}
                fullWidth
                size="small"
              />
            </Box>
            <Box p={0} m={1} css={{ width: 100 }}>
              <Autocomplete
                size="small"
                id="combo-box-demo"
                options={grades}
                getOptionLabel={(grades) => grades.grade}
                style={{ width: 100 }}
                name="Grade"
                type="text"
                renderInput={(params) => (
                  <TextField
                    size="small"
                    required
                    {...params}
                    label="Grade"
                    name="Grade"
                    type="text"
                    inputRef={register}
                    variant="outlined"
                  />
                )}
              />
            </Box>

            <Box p={0} m={1} css={{ width: 240 }}>
              <Autocomplete
                size="small"
                id="combo-box-demo"
                options={sections}
                getOptionLabel={(sections) => sections.section}
                style={{ width: 240 }}
                inputRef={register}
                name="Section"
                type="text"
                renderInput={(params) => (
                  <TextField
                    size="small"
                    required
                    {...params}
                    label="Section"
                    name="Section"
                    type="text"
                    inputRef={register}
                    variant="outlined"
                  />
                )}
              />
            </Box>
            <Box  css={{ width: 200 }} flexgrow={1}
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="flex-start" 
            alignContent="flex-start"
            >
            <Box p={0} m={1} css={{ width: 80 }}  >
              <TextField
                size="small"
                required
                id="outlined-basic"
                label="Hrs"
                type="number"
                name="Hrs"
                variant="outlined"
                fullWidth
                inputRef={register}
              />
            </Box>
            <Box p={0} m={1} css={{ width: 80 }} >
              <TextField
                size="small"
                required
                id="outlined-basic"
                label="Mins"
                type="number"
                name="Mins"
                variant="outlined"
                fullWidth
                inputRef={register}
              />
            </Box>
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
                    width="150px"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    name="date"
                    type="text"
                    value={selectedDate}
                    inputRef={register}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    size="small"
                    style={{width:"150px"}}
                  />
                
               

                
              </MuiPickersUtilsProvider>
            </Box><Box p={0} m={1} css={{ width: 150 }} flexgrow={1} >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
            
              <KeyboardTimePicker
                    size="small"
                    margin="none"
                    width="150px"
                    id="time-picker"
                    label="Time picker"
                    name="time"
                    type="text"
                    value={selectedDate}
                    onChange={handleDateChange}
                    inputRef={register}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                    style={{width:"150px"}}
                />
          
              </MuiPickersUtilsProvider>
            </Box>
            </Box>
          </Box>
        

      <div className={classes.acc}>
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
        onClick={() =>
          addElement()
        }
      >
        Add Parts
      </Button>
      </Box>
        {dynamicParts}
      </div>
      <Box 
      display="flex"
      flexDirection="row"
      p={1}
      m={1}
      flexWrap="wrap"
      justifyContent="center"
      alignItems="flex-start"
      alignContent="flex-start">
      <Fab color="primary" aria-label="add" type="submit" >
          <SaveIcon />
        </Fab>
      </Box>
         
       
      </div>
      </Container>
      </form>
    </>
  );
}

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

export default CreateExam;
