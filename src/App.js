import React from "react";
import "./App.css";
import firebase from "./Firebase/FirebaseConfig";
import AddDetails from "./Components/AddDetails";
import Header from "./Components/Header";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import AdminData from "./Components/AdminData";
import DisplayMedia from "./Components/DisplayMedia";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const auth = firebase.auth();


const App = () => {

  // auth.onAuthStateChanged(user=>{
  //   if(user){
  //     console.log("user login",user)
  //   }
  //   else{
  //     console.log("user logout")
  //   }
    
  // })
  // React.useEffect(()=>{
  //   const msg = firebase.messaging();
  //   msg.requestPermission().then(()=>{
  //     return msg.getToken();
  //   }).then((data)=>{
  //     console.log("token",data)
  //   }).catch(()=>{
  //     console.log("error")
  //   })
  // })

  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            

            <Route path="/AddDetails">
            <AddDetails/>
            </Route>

            <Route path="/AdminData">
            <AdminData/>
            </Route>

            <Route path="/signUp">
              <SignUp />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/displayMedia">
              <DisplayMedia/>
            </Route>

            <Route path="/">
            <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
    // <div className="App">
    //   <div className="title-row">
    //     <Header/>
    //     <AddDetails/>
    //   </div>
    // </div>
  );
};
export default App;
