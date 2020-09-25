import React from 'react'
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Parts from './GenerateParts' 

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({ 
    accroot: {
        width: '100%',
        marginBottom:6,
      },
      accheading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },

}))

function GeneratePartsList(props) {
    
  const classes = useStyles();

    return (
        <div className={classes.accroot} key={props.index}>
          <Accordion  key={props.index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />} 
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.accheading}>Accordion {props.index+1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Parts part= {true} examId={props.examId} item={props.item} />
            </AccordionDetails>
          </Accordion>
          </div>
    )
}

export default GeneratePartsList
