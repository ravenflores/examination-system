import React,{useEffect,createContext,useReducer,useContext} from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter, Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/ExamForms/Homepage/Home'
import TeacherSignUp from './components/ExamForms/SignUpForms/Teacher'
import TeacherDashboard from './components/ExamForms/Dashboard/Teacher'
import {reducer,initialState} from './reducers/userReducer'
import './App.css'

import CreateExam from './components/ExamForms/CreateExam/CreateExam'
import AllExams from './components/ExamForms/EditExam/AllExams'



export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const{state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const position =  JSON.parse( localStorage.getItem("position"))
    const user =  JSON.parse( localStorage.getItem("user"))
    

    console.log(position)
    
      if(user){
        dispatch({type:"USER",payload:user})
        history.push('/teacher/dashboard')
      }
      else{
        if(position=="teacher")
        {
          history.push('/teacher')
        }
        else {
          history.push('/')
        }
      }
                                                                                                                                                                                                                                                                                                                                                                   
  },[])
  return(
    <Switch>
        <Route exact path= "/">
          <Home />
        </Route>
        <Route exact path= "/teacher">
          <TeacherSignUp />
        </Route>
        <Route exact path= "/teacher/dashboard">
          <TeacherDashboard />
        </Route>
        <Route exact path= "/teacher/dashboard/createexam">
          <CreateExam />
        </Route>
        <Route exact path= "/teacher/dashboard/allexam">
          <AllExams />
        </Route>
    </Switch>
    )
  
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
  <UserContext.Provider value= {{state,dispatch}}>

    <BrowserRouter>






    {/* <Navbar /> */}
    {/* <SimpleAlerts /> */}
    <Routing />
    {/* <RecipeReviewCard /> */}
    </BrowserRouter>
  </UserContext.Provider>
    
)
}
export default App
