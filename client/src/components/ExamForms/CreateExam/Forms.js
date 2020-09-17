// FormElements.jsx

import React from "react";
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

import InputFieldsText from "./InputFields";

export function PartsDetails({ children, partNum, setParts }) {
  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      test: [{ test: "raven" }]
    }
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "questions",
      
    }
  );
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

    let a = times - 1;
    const elements = [{ test: "test" }];

    while (a >= 0) {
      elements.push({ test: "test" });
      console.log(elements);
      a--;
    }
    append(elements);
  };

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

  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  
  const onSubmit = (data) => console.log(watch());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                <Box p={0} m={1} css={{ width: 200 }} flexGrow={1}>
                              <Autocomplete
                                size="medium"
                                id="combo-box-demo"
                                options={types}
                                getOptionLabel={(types) => types.type}
                                style={{ width: 'auto' }}
                                name="Grade"
                                type="text"
                                renderInput={(params) => (
                                  <TextField
                                    size="medium"
                                    required
                                    {...params}
                                    label="Select Exam Types"
                                    name={"examTypes"}
                                    type="text"
                                    inputRef={register()}
                                    variant="outlined"
                                  />
                                )}
                              />
                </Box>
                <Box p={0} m={1} css={{ width: 200 }} flexGrow={1}>
                    <TextField
                      size="medium"
                      required
                      id="outlined-basic"
                      label="Set number of Items"
                      type="number"
                      name= {"partNoOfItems"}
                      variant="outlined"
                      fullWidth
                      inputRef={register()}
                    />
              </Box>
              <Box p={0} m={1} css={{ width: 200 }} flexGrow={1}>
                    <TextField
                      size="medium"
                      required
                      id="outlined-basic"
                      label="Set Points Per Item"
                      type="number"
                      name={"partPointsPerItem"}
                      variant="outlined"
                      fullWidth
                      inputRef={register()}
                    />
              </Box>
              
              <Box p={0} m={1} css={{ width: 200 }} flexGrow={1}>
                              <Autocomplete
                                size="medium"
                                id="combo-box-demo"
                                options={difficulty}
                                getOptionLabel={(difficulty) => difficulty.type}
                                style={{ width: 'auto' }}
                                name="Grade"
                                type="text"
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
                                  />
                                )}
                              />
                </Box>
                <Box p={0} m={1} css={{ width: 400 }} flexGrow={1}>
                  <TextField
                    size="medium"
                    required
                    id="outlined-basic"
                    label="Instructions"
                    type="number"
                    name={partNum + "partSetInstructions"}
                    variant="outlined"
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
                            
                            action={
                              <Button variant="contained" onClick={() => remove(index)}>DELETE</Button>
                            }
                            title={""+(index+1)}
                            // subheader="September 14, 2016"
                          />
                      
                        {Array.isArray(children)
                          ? children.map((child) => {
                              return child.props.name //if there a name props will be passed else di magiinput props sa baba
                                ? React.createElement(child.type, {
                                    ...{
                                      ...child.props,
                                      register: () =>register(),
                                      fields:fields,
                                      index: index,
                                      append:() =>append(),
                                      remove:() =>remove(),
                                      control: control,
                                      key: child.props.name,
                                    },
                                  })
                                : child;
                            })
                          : children}
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

              
            
            <Button onClick={() => appen(0)}
            variant="contained"
            color="secondary"
            className={classes.button}
            >Add</Button>
              <Button  onClick={() =>
                  reset({
                    test: [{ test: "raven" }],
                  })
                }
                
              variant="contained"
              color="default"
              className={classes.button}
                >Reset</Button> 
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
  );
}

export function MultipleChoice({ register, name,fields, index,remove,append, ...rest }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "inherit",
    },
  }));
  const classes = useStyles();
  const [value, setValue] = React.useState("female");
  const {control} = useForm({
    defaultValues: {
      questions: [{ choices:[{ choice: "tet" }] }]
      //questions[${index}].choices[${indexx}].choice
    }
  });

  const a = useFieldArray(
    {
      control,
      name: "questions",
      
    }
    )
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      
        <CardContent style={{width:'inherit'}}>
          <TextField
            name={`questions[${index}].question`}
            size="medium"
            required
            id="outlined-basic"
            inputRef={register()}
            label="question"
            type="text"
            variant="outlined"
            fullWidth
            {...rest} // make sure to set up defaultValue
          />

          <div style={{width:'inherit'}}>
                 <InputFieldsText
                  size="medium"
                  required
                  name={`questions[${index}].answer`}
                  variant="outlined"
                  label="answer"
                  fullWidth
                  inputRef={register()}
                  margin='dense'

                />
                {a.fields.map((items, indexx) => {
                return (
                  <div key={items.id} style={{display:'flex'}}>
                     <div style={{width:'55%'}}>
                        <InputFieldsText
                          size="medium"
                          required
                          name={`questions[${index}].choices[${indexx}].choice`}
                          variant="outlined"
                          label={`choice ${indexx+1}`}
                          fullWidth
                          inputRef={register()}
                          margin='dense'
                          
                        />
                      </div>
                      <div style={{width:'45%'}}>
                        {a.fields.length==indexx+1?
                        <><Button onClick={() => a.append()}
                        variant="contained"
                        color="secondary"   
                        className='parts-btn2'
                        >Add</Button>
                        <Button className='parts-btn1' variant="contained" onClick={() => a.remove(indexx)}>DELETE</Button>
                        </>:<Button className='parts-btn12' variant="contained" onClick={() => a.remove(indexx)}>DELETE</Button>
                        }
                      
                      
                      </div>
                  </div>
                   
                );
              })}
                
            
          </div>
        </CardContent>
    </>
  );
}

export function Input({ register, name, ...rest }) {
  return <input name={name} ref={register} id="input" {...rest} />;
}
