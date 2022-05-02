import React, { useEffect, useState } from "react";
import axios from "axios";
import firebase from "../Firebase/FirebaseConfig";
import { useHistory } from "react-router";
import "./Login.css";

const auth = firebase.auth();

const Login = () => {
  let History = useHistory();
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  // const fetchData = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:5000/api/notification/sendToAll", {
  //       // headers: {
  //       // 	Authorization: 'Bearer ' + token,
  //       // },
  //     });

  //     console.log("ImagesList", res.data);
  //     // setDocs(res.data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const handleLogin = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, Password).then((cred) => {
      History.push("/AddDetails");
      // console.log(cred.user);
      // console.log("user Login");
    });
    setEmail("");
    setPassword("");
    // fetchData()
  };

  return (
    <>
      {/* <h4>Login</h4>
      <br />
      <form onSubmit={handleLogin} id="signup-form">
        <div className="input-field">
          <input
            type="email"
            id="signup-email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <br />
        <br />
        <br />
        <div className="input-field">
          <input
            type="password"
            id="signup-password"
            placeholder="Password"
            required
            value={Password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <br />
        <br />
        <br />
        <button type="submit" className="btn yellow darken-2 z-depth-0">
          Login
        </button>
      </form> */}

      {/* <form onSubmit={handleLogin}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
              setEmail(e.target.value);
            }}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={Password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            />
          </div>
          <p>{formErrors.password}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form> */}

      <div className="center">
        <h1>Login Form</h1>
        <form onSubmit={handleLogin}>
          

          <div className="txt-field">
            <input
              placeholder="Email"
              type="text"
              name="email"
              value={email}
              onChange={(e) => {
              setEmail(e.target.value);
            }}
            ></input>
            {/* {errors.email && <span>{errors.email}</span>} */}
          </div>

          <div className="txt-field">
            <input
              placeholder="Password"
              type="password"
              name="Password"
              value={Password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            ></input>
            {/* {errors.addresses && <span>{errors.addresses}</span>} */}
          </div>



          <input type="submit" value="Submit"></input>
        </form>
      </div>
    </>
  );
};

export default Login;
