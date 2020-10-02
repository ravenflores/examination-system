import React,{useEffect,useState,useContext,createRef} from 'react'
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EdtIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import Box from "@material-ui/core/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

// import Exam from './Exam'
// import {deletes} from './GenerateFetch'

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));



export default function ClassList(props) {

    const [open,setOpen] = useState(false);
    const [dialog,setDialog] = useState(false);
    const [currentId,setCurrentId] = useState(false);
    const [currentGrade,setCurrentGrade] = useState(8)
    const { register, handleSubmit, errors, watch } = useForm();
    const wrapper = createRef()

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = (e) => {
        setOpen(true);
        setCurrentId(e)


    };

    const handleCloseYes = (e) => {
        setDialog(true)
        console.log("napindot")
        // deletes(currentId,data,setData,setDialog)
        setOpen(false);
    };
    const handleCloseNo = (e) => {
        setDialog(true)
        console.log("napindot")
        setDialog(false)
        setOpen(false);
    };

    const [data,setData] = useState([])
    const classes = useStyles();
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
      });

    const [stateDis, setStateDis] = React.useState({
      });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
      
    const handleChangeDis = (event) => {
        console.log(stateDis)
        console.log(event.currentTarget.disabled)
        setStateDis({ ...stateDis, [event.currentTarget.name]: event.currentTarget.disabled });
        
       
      };

      


    useEffect(()=>{
        if(setCurrentGrade){
            fetch(`/classlist/${currentGrade}`,{
                headers:{
                    "Authorization": "Bearer "+localStorage.getItem("jwt")
                }
            })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.mypost)
            })
        }
        
        },[currentGrade])
        
        
       


    return (
      <div>
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleCloseNo}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Are you sure you want to delete this?"}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    This will be a lost of your previous inputs please be careful in deleting important data like this.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button autoFocus disabled={dialog} onClick={(e)=>handleCloseNo(e)} color="primary">
                    NO
                </Button>
                <Button disabled={dialog} onClick={(e)=>handleCloseYes(e)} color="primary" autoFocus>
                    YES
                </Button>
                </DialogActions>
            </Dialog>
            </div>
            <Box
            display="flex"
            flexDirection="center"
            m={1}
            bgcolor="background.paper"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="cente" 
            alignContent="center"
            css={{borderRadius:'6px'}}

          >
            
                              <Autocomplete
                                size="medium"
                                id="combo-box-demo"
                                options={grades}
                                getOptionLabel={(grades) => grades.grade}
                                style={{ width: '150',marginRight:1 }}
                                type="text"
                                renderInput={(params) => (
                                  <TextField
                                    size="medium"
                                    required
                                    {...params}
                                   
                                    name={"grade"}
                                    type="text"
                                    variant="outlined"
                                    inputRef={register()}
                                    fullWidth
                                  />
                                )}
                              />

                            <Button
                                variant="contained"
                                color="default"
                                className={classes.button}
                                // startIcon={<AddIcon />}
                                onClick={()=>setCurrentGrade(watch("grade"))}
                            > 
                            Set Grade
                            </Button>
               
                
            </Box>
             <Typography style={{textAlign:'center'}}>
                 Classes in grade {currentGrade}
             </Typography>
                
        <div style={{width:'auto'}} ref={wrapper}>
            
            
            {  
            
                    data.map((item,index) => {
                        return(
                            <Card style={{marginBottom:2,borderRadius:0}}  key={item._id}>
                            
                            <CardHeader
                                    // avatar={
                                    // <Avatar aria-label="recipe" className={classes.avatar}>
                                    //     R    
                                    // </Avatar>
                                    // }
                                 
                                    key={item._id}
                                    style={{padding:10}}
                                    action={
                                        <>
                                    <Tooltip title="Edit">
                                    <IconButton aria-label="edit" >
                                        <EdtIcon />
                                    </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        
                                  
                                        <IconButton 
                                        aria-label="delete" 
                                        
                                        onClick={()=>handleClickOpen(item._id)}
                                        >
                                            <DeleteIcon />
                                            
                                        </IconButton>

                                   
                                    
                                    </Tooltip>
                                    
                                    
                                    </>

                                    }
                                    title={item.section }
                                    
                                />
                            </Card>
                        )
                    })
                }
            
        </div>
        </div>
        
    )
}

const grades = [
    { grade: "7" },
    { grade: "8" },
    { grade: "9" },
    { grade: "10" },
    { grade: "11" },
    { grade: "12" },
  ];