import React from 'react'
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";




const newDynamicElem =(examid,partNum) => {

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
                          name= {partNum+"partNoOfItems"}
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
                          name={partNum+"partPointsPerItem"}
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
                                        name={partNum+"difficulty"}
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
                          name={partNum+"partSetInstructions"}
                          variant="outlined"
                          multiline
                          fullWidth
                          inputRef={register}
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

export default function AllParts() {
    return (
        <div>
            
        </div>
    )
}
