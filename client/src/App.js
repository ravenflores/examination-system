import React,{useEffect,createContext,useReducer,useContext} from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter, Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import UserProfile from './components/screens/UserProfile'
import Subscriptions from './components/screens/Subscriptions'
import {reducer,initialState} from './reducers/userReducer'
import TemporaryDrawer from './components/Drawer'
import RecipeReviewCard from './components/Card'
import SimpleAlerts from './components/Alert'




export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const{state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user =  JSON.parse( localStorage.getItem("user"))
    
    console.log(user)
    if(user){
      dispatch({type:"USER",payload:user})
      

    }
    else{
      history.push('/login')
    }                                                                                                                                                                                                                                                                                                                                                                   
  },[])
  return(
    <Switch>
        <Route exact path= "/">
          <Home />
        </Route>
        <Route path= "/login">
          <Login />
        </Route>
        <Route path= "/signup">
          <Signup />
        </Route>
        <Route exact path= "/profile">
          <Profile />
        </Route>
        <Route path= "/createpost">
          <CreatePost />
        </Route>
        <Route path= "/profile/:userid">
          <UserProfile />
        </Route>
        <Route path= "/myfollowingpost">
         <Subscriptions />
        </Route>
    </Switch>
    )
  
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
  <UserContext.Provider value= {{state,dispatch}}>

    <BrowserRouter>
    <Navbar />

    {/* <SimpleAlerts /> */}
    <Routing />
    {/* <RecipeReviewCard /> */}
    </BrowserRouter>
  </UserContext.Provider>
    
)
}
export default App
