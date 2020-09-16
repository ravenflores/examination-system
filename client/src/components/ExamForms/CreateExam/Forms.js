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

import InputFieldsText from "./InputFields";

export function PartsDetails({ children, partNum, setParts }) {
  const methods = useForm({
    defaultValues: {
      test: [{ test: "raven" }],
    },
  });

  const control = methods.control;

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "test",
    }
  );
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

  
  const onSubmit = (data) => alert(JSON.stringify(methods.watch()));

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
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
            css={{ borderRadius: "6px" }}
          >
            <div style={{ width: "100%" }} key={partNum + "div"}>
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
                                    inputRef={methods.register}
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
                      inputRef={methods.register}
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
                      inputRef={methods.register}
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
                                    inputRef={methods.register}
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
                    label="Instructions"
                    type="number"
                    name={partNum + "partSetInstructions"}
                    variant="outlined"
                    multiline
                    fullWidth
                    inputRef={methods.register}
                  />
                </Box>
              </Box>
            </div>

            <div style={{ width: "100%" }} key={partNum + "div2"}>
              {fields.map((item, index) => {
                return (
                  <>
                  <Card className={classes.card} variant="outlined">
                  <Box
                    key={partNum + "div3"}
                    display="flex"
                      flexDirection="row"
                      p={1}
                      m={1}
                      bgcolor="background.paper"
                      flexWrap="wrap"
                      justifyContent="flex-end"
                      alignItems="flex-end"
                      alignContent="flex-end"
                   >
                     <Button variant="contained" onClick={() => remove(index)}>DELETE</Button>
                  </Box>
                    {Array.isArray(children)
                      ? children.map((child) => {
                          return child.props.name //if there a name props will be passed else di magiinput props sa baba
                            ? React.createElement(child.type, {
                                ...{
                                  ...child.props,
                                  register: methods.register,
                                  index: index,
                                  control: control,
                                  key: child.props.name,
                                },
                              })
                            : child;
                        })
                      : children}
                    </Card>
                  </>
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
                  methods.reset({
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

export function MultipleChoice({ register, name, control, index, ...rest }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "inherit",
    },
  }));
  const classes = useStyles();
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      
        <CardContent style={{width:'inherit'}}>
          <TextField
            name={`questions[${index}].question`}
            size="small"
            required
            id="outlined-basic"
            inputRef={register}
            label="question"
            type="text"
            variant="outlined"
            fullWidth
            {...rest} // make sure to set up defaultValue
          />

          <div style={{marginTop:'20px',width:'inherit'}}>
            <FormControl component="fieldset" style={{width:'inherit'}}>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
                row
              >
                <InputFieldsText
                  size="small"
                  required
                  name={`questions[${index}].answer`}
                  variant="outlined"
                  label="answer"
                  style={{width:'50%'}}
                  inputRef={register}
                  margin='dense'

                />
                <InputFieldsText
                  size="small"
                  required
                  name={`questions[${index}].choice1`}
                  variant="outlined"
                  label="choice1"
                  fullWidth
                  inputRef={register}
                  style={{width:'50%'}}
                  margin='dense'
                  
                />
                <InputFieldsText
                  size="small"
                  required
                  name={`questions[${index}].choice2`}
                  variant="outlined"
                  label="choice2"
                  fullWidth
                  inputRef={register}
                  style={{width:'50%'}}
                  margin='dense'
                />
                <InputFieldsText
                  size="small"
                  required
                  name={`questions[${index}].choice3`}
                  variant="outlined"
                  label="choice3"
                  fullWidth
                  inputRef={register}
                  style={{width:'50%'}}
                  margin='dense'
                />
              </RadioGroup>
            </FormControl>
          </div>
        </CardContent>
    </>
  );
}

export function Input({ register, name, ...rest }) {
  return <input name={name} ref={register} id="input" {...rest} />;
}
