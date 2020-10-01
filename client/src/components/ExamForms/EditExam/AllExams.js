import React,{useEffect,useState,useContext} from 'react'

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

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import Exam from './Exam'
import {deletes} from './GenerateFetch'

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



export default function AllExams(props) {

    const [open,setOpen] = useState(false);
    const [dialog,setDialog] = useState(false);
    const [currentId,setCurrentId] = useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = (e) => {
        setOpen(true);
        setCurrentId(e)


    };

    const handleCloseYes = (e) => {
        setDialog(true)
        console.log("napindot")
        deletes(currentId,data,setData,setDialog)
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
        fetch('/myexams',{
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
        
        
        const convertDate = (dates) =>{

            let date = new Date(dates.date);
            if(dates.subject){ 
                let a = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate()+' '+dates.subject+' '+dates.grade+' '+dates.section
                return a
            }
            else{   
                let a = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate()   
                 return a
            }
        }

    const dis = (e) => {
        
            e.currentTarget.disabled = true
            console.log(e.currentTarget)
        
        }

    return (

        <>
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
        <div style={{width:'auto'}}>
            {  
            
                    data.map((item,index) => {
                        return(
                            <Card style={{marginBottom:2,borderRadius:0}} key={item._id}>
                            
                            <CardHeader
                                    avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        R
                                    </Avatar>
                                    }
                                    style={{padding:10}}
                                    action={
                                        <>
                                    <Tooltip title="Edit">
                                    <IconButton aria-label="edit" onClick={()=>props.handlePage(<Exam examId={item._id} />)} >
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
                                    <Tooltip title="toggle show and hide exam">
                                    <FormControlLabel
                                        control={
                                        <Switch
                                            checked={state.checked}
                                            onChange={handleChange}
                                            name={`checked${index}`}
                                            color="primary"
                                        />
                                        }
                                        
                                    />
                                    </Tooltip>
                                    
                                    </>

                                    }
                                    title={ item.examname }
                                    subheader={convertDate(item)
                                    
                                    }
                                />

                
                            </Card>
                        )
                    })
                }
            
        </div>
        </>
    )
}
