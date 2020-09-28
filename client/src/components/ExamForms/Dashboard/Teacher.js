import React,{useState, useEffect,useContext} from 'react'
import {UserContext} from '../../../App'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Container } from '@material-ui/core';

import CreateExam from '../CreateExam/CreateExam'
import AllExams from '../EditExam/AllExams'

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';

import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  fab: {
    '& > *': {
      margin: theme.spacing(1),
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  rootNested: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function TeacherDashboard(props) {
    const [data,setData] = useState([])
    const {state,dispatch} =  useContext(UserContext)
    const [comment,setComment] = useState("")
    const [comId,setComId] = useState()
    const [posId,setPostId] = useState()    
    const [edit,setEdit] = useState("")
    const [text,setText] = useState("")

    const [onPage,setOnPage] = useState()

    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const [open, setOpen] = React.useState(true);

    const handlePages =(a) =>{
      setOnPage(a)
    }

    useEffect(()=>{
      setOnPage(<AllExams handlePage={handlePages} />)
    },[])

    const handleClick = () => {
      setOpen(!open);
    };
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
          <div className={classes.toolbar} />
          <Divider />

          <List>

        <ListItem button >
                <ListItemText primary={'Profile'} />
        </ListItem>
      <ListItem button onClick={handleClick}>
        {/* <ListItemIcon>
          <InboxIcon />
        </ListItemIcon> */}
        <ListItemText primary="Exam" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button onClick={()=>(setMobileOpen(false),setOnPage(<AllExams handlePage={handlePages} />))} className={classes.nested}>
            <ListItemText primary="Exams" />
          </ListItem>
          <ListItem button onClick={()=>(setMobileOpen(false),setOnPage(<CreateExam />))} className={classes.nested}>
            <ListItemText primary="Create Exam" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button component={Link} to="/design" >
                <ListItemText primary={'Pending Exams'} />
              </ListItem>
              <ListItem button component={Link} to="/design" >
                <ListItemText primary={'Student Records'} />
              </ListItem>
              <ListItem button component={Link} to="/design" >
                <ListItemText primary={'Data Analysis'} />
      </ListItem>
    </List>
          <Divider />
          <List>
            {['Sign Out'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      );

    
    const container = window !== undefined ? () => window().document.body : undefined;


    
    // useEffect(() => {
    //     fetch('/allpost',{
    //         headers:{
    //             "Authorization" : "Bearer "+localStorage.getItem("jwt")
    //         }
    //     }).then(res => res.json())
    //     .then(result => {
    //         console.log(result)
    //         setData(result )

            
 
    //     }).catch(err =>{ 
    //         console.log(err)
    //     })
      
        
    // },[])   

    


    return (
        <>
            <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Exams
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
       {onPage}
         
         
      </main>
    </div>
        </>
    )
}

TeacherDashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };

export default TeacherDashboard
