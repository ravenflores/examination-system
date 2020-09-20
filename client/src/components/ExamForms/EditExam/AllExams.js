import React,{useEffect,useState,useContext} from 'react'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

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

export default function AllExams() {
    const [data,setData] = useState([])
    const classes = useStyles();

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
            
            let date = new Date(dates);
            let a = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate()   
            return a
        }
    return (
        <div style={{width:'inherit'}}>
            {  
                    data.map(item => {
                        return(
                            <Card>
                            <CardHeader
                                    avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        R
                                    </Avatar>
                                    }
                                    action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                    }
                                    title={ item.examname }
                                    subheader={
                                        
                                        convertDate(item.date)
                                    
                                    }
                                />

                
                            </Card>
                        )
                    })
                }
            
        </div>
    )
}
