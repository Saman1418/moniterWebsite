import React, { useState,useEffect } from "react";
// import "./Header.css";
// import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "../Firebase/FirebaseConfig";

import { useHistory } from "react-router";
const functions = firebase.functions();
const auth = firebase.auth();

const Header = () => {
  let History = useHistory();
  const [loginStatus, setLoginStatus] = useState(null);
  const [adminStatus, setsdminStatus] = useState();
  const [adminEmail, setAdminEmail] = useState("");

  const handleLogout = () => {
    auth.signOut();
    setsdminStatus(false);
    History.push("/login");
  };


  // useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user",user)
        if (user.admin) {
          console.log("user.admin",user.admin)
          setsdminStatus(true);
        }
        // else{
          
        //   setsdminStatus(false);
         
        // }
  
        setLoginStatus(user);
      } else {
        setLoginStatus(null);
      }
    });
  // },[adminStatus])

  console.log("ddddddddddddddddddddddddddddddd",adminStatus)
  

  

  const handleAdmin = (e) => {
    e.preventDefault();
    const addAdminRole = functions.httpsCallable("addAdminRole");
    addAdminRole({ email: adminEmail }).then((result) => {
      console.log(result);
    });
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Website Tracker
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <Link to={"/"}>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page">
                    Home
                  </a>
                </li>
              </Link>

              {loginStatus == null ? (
                <>
                  <Link to={"/SignUp"}>
                    <li class="nav-item">
                      <a class="nav-link">SignUp</a>
                    </li>
                  </Link>

                  <Link to={"/login"}>
                    <li class="nav-item">
                      <a class="nav-link">Login</a>
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={"/AddDetails"}>
                    <a href className="nav-link scrollto">
                      AddDetails
                    </a>
                  </Link>

                  {loginStatus.admin == true && (
                    <Link to={"/AdminData"}>
                      <a href className="nav-link scrollto">
                        AdminData
                      </a>
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleLogout}
                    class="btn btn-primary"
                  >
                    Logout
                  </button>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <header
        id="header"
        className="d-flex flex-lg-row flex-column  align-items-center"
      >
        {adminStatus ? (
          <>

            <form
              onSubmit={handleAdmin}
              className="center-align admin-actions"
              style={{ margin: "40px auto", maxwidth: "300px" }}
            >
              

              
            <div className="txt-fields">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={adminEmail}
                required
                onChange={(e) => {
                  setAdminEmail(e.target.value);
                }}
              />
            </div>
              <button
                type="submit"
                className="btn btn-info"
              >
                Make admin
              </button>
            </form>
          </>
        ) : (
          ""
        )}
      </header>
    </>
  );
};

export default Header;
