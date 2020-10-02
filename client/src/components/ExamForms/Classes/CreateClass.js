import React,{useState} from 'react'
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from '@material-ui/core/CardHeader';
import Autocomplete from "@material-ui/lab/Autocomplete";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import { useForm } from "react-hook-form";
export default function CreateClass() {
    const { register, handleSubmit, errors } = useForm();

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


      const [grade,setGrade] = useState()
      const [section,setSection] = useState()

      const addClass =(e) =>{
          console.log(e)
        fetch("/addclass",{
            method:"post",
            headers:{
                "Content-Type": "application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }   ,
            body:JSON.stringify({
                grade:e.grade,
                section: e.section,
            })
        }).then(res => res.json())
        .then(data =>{
            if(data.error){
            console.log(data.error)
            
            return
            }
            else{
               
                console.log(data)
            }
        }
        
        )
    
       
    
    
    }
    return (
        <div>
           <form onSubmit={handleSubmit((data) => addClass(data))} >
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
            <div style={{ width: "100%" }}>
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
                                options={grades}
                                getOptionLabel={(grades) => grades.grade}
                                style={{ width: 'auto' }}
                                type="text"
                                renderInput={(params) => (
                                  <TextField
                                    size="medium"
                                    required
                                    {...params}
                                    label="Select Grade"
                                    name={"grade"}
                                    type="text"
                                    variant="outlined"
                                    inputRef={register()}
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
                      label="Section"
                      type="text"
                      name={"section"}
                      inputRef={register()}
                      variant="outlined"
                      fullWidth
                    />
              </Box>
              
             
              </Box>
            </Card>
            </div>

            

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
      </form>
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
