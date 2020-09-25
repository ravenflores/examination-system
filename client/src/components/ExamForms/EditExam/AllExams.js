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

import Exam from './Exam'

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
    const [data,setData] = useState([])
    const classes = useStyles();
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
      });

      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
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
    return (
        <div style={{width:'inherit'}}>
            {  
            
                    data.map((item,index) => {
                        return(
                            <Card style={{marginBottom:2,borderRadius:0}} key={item._id}>
                            
                            <CardHeader
                                    // avatar={
                                    // <Avatar aria-label="recipe" className={classes.avatar}>
                                    //     R
                                    // </Avatar>
                                    // }
                                    style={{padding:10}}
                                    action={
                                        <>
                                    <Tooltip title="Edit">
                                    <IconButton aria-label="edit" onClick={()=>props.handlePage(<Exam examId={item._id} />)} >
                                        <EdtIcon />
                                    </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                    <IconButton aria-label="delete">
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
    )
}
