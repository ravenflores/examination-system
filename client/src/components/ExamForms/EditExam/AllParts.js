import React,{useState,useEffect} from 'react'
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Fab from '@material-ui/core/Fab';

import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { makeStyles } from "@material-ui/core/styles";

import CreateExam from './GenerateExam'

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

  


const newDynamicElem =(examid,partNum,classes) => {

        return (
            <>
            <Accordion defaultExpanded={false} key={partNum+"accordion"}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                key={partNum+"header"}
              >
                <Typography className={classes.heading} key={partNum+"header text"}>Part {partNum}</Typography>
              </AccordionSummary>
              <AccordionDetails key={partNum+"details"} className={classes.details}  >
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
                    <div style={{ width: "100%" }} key={partNum+"div"}>
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
                                        name={partNum+"examTypes"}
                                        type="text"
                                        
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
                          name= {partNum+"partNoOfItems"}
                          variant="outlined"
                          fullWidth
                          
                        />
                  </Box>
                  <Box p={0} m={1} css={{ width: 200 }} flexGrow={1}>
                        <TextField
                          size="small"
                          required
                          id="outlined-basic"
                          label="Set Points Per Item"
                          type="number"
                          name={partNum+"partPointsPerItem"}
                          variant="outlined"
                          fullWidth
                          
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
                                        name={partNum+"difficulty"}
                                        type="text"
                                        
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
                          name={partNum+"partSetInstructions"}
                          variant="outlined"
                          multiline
                          fullWidth
                          
                        />
                  </Box>
                    </Box>
                    </div>
                   
                    
                   
                    <div style={{ width: "100%" }} key={partNum+"div2"}>
                     
                    </div>
                    <div style={{ width: "100%", direction:'rtl'}} key={partNum+"div3"}>
                    
                    <Fab variant="extended" color="default" size="small" >
                      Delete
                        <DeleteIcon className={classes.extendedIcon} />
                        
                      </Fab>
                    <Fab variant="extended" color="primary" size="small" >
                      Save
                        <SaveIcon className={classes.extendedIcon} />
                        
                      </Fab>
                      
                        
                    </div>
                    </Box>
    
    
                      
              </AccordionDetails>
            </Accordion>
          </>
        )
    } 

    const defaultValues = {
        questions: [
          {
            name: "questions",
            choices: [{ choice: "field1"}]
          }
        ],
      
      };
export default function AllParts(props) {

  const [data,setData] = useState([])
  const {
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    setValue,
    watch,
  } = useForm({defaultValues});
  const classes = useStyles();
//   useEffect(()=>{
//     console.log('panget')
//     fetch(`/myparts/${props.examId}`,{
//         headers:{
//             "Authorization": "Bearer "+localStorage.getItem("jwt")
//         }
//     })
//     .then(res => res.json())
//     .then(result => {
//         console.log(result)
//         setData(result.mypost)
//     })
//     },[])

useEffect(()=>{
    fetch(`/myexam/${props.examId}`,{
        headers:{
            "Authorization": "Bearer "+localStorage.getItem("jwt")
        }
    })
    .then(res => res.json())
    .then(result => {
        console.log(result)
        setData(result.mypost)
    })
    },[])   

    const onSubmit = (data) => {
        console.log("examId: "+props.examId)
        console.log("data", data);
    
      } 

    return ( 
        <div>
             <form onSubmit={handleSubmit(onSubmit)}>
            {
                data.map((item,index)=>{

                    return <CreateExam item={item} />

                })
            }
            </form>
            
            
        </div>
    )
}
