import React,{useContext,useState,useEffect} from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Menu } from '@material-ui/icons';
import {Link,useHistory} from 'react-router-dom'
import { UserContext } from '../App'
import Box from '@material-ui/core/Box';
import {createMuiTheme,responsiveFontSizes,MuiThemeProvider,Typography} from '@material-ui/core';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root:{
    justifyContent: 'center',
  },
});

let theme = createMuiTheme()
theme = responsiveFontSizes(theme)



export default function TemporaryDrawer() {
  const classes = useStyles();
  const history = useHistory()  
  const {state,dispatch} = useContext(UserContext)
  const [states, setStates] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setStates({ ...states, [anchor]: open });
  };

  const links = (index) => {
    console.log("napindot")
    if(index == 0){

        history.push('/')
    }
    if(index == 1){

        history.push('/profile')
    }
    if(index == 2){

        history.push('/createpost')
    }
    if(index == 3){

        history.push('/myfollowingpost')
    }
}

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >


    <List>
        <ListItem button >
                 <img id="prof" src={state?state.photo:"https://images.unsplash.com/photo-1522039553440-46d3e1e61e4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" }/>
         </ListItem>
    </List>
    <Divider />
   
        <MuiThemeProvider theme={theme}>
        <Typography variant="subtitle1" gutterBottom>
            {state?state.name:"loading"}
        </Typography>
        </MuiThemeProvider>
    
    <Divider />
      <List>

        {['Home', 'Profile', 'Create Post', 'Following'].map((text, index) => (
          <ListItem button onClick={()=>links(index)}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
      <ListItem id="log-out" className="btn #c62828 red darken-3"
                onClick = {()=>{
                  localStorage.clear()
                  dispatch({type:"CLEAR"})
                  history.push('/login')
                }} 
                >
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary="Log Out" />
                </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
          <Menu />
          </Button>
          <Drawer anchor={anchor} open={states[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
