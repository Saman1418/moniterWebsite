import React, { useEffect, useState } from "react";
import firebase from "../Firebase/FirebaseConfig";
import { useHistory } from "react-router";
const auth = firebase.auth();
const db = firebase.firestore()

const SignUp = () => {
    let History = useHistory();
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSignup = (e) => {
      
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email, Password).then((cred) => {
        return db.collection('users').doc(cred.user.uid).set({
            mobileNumber
          });
    //   console.log(cred.user);
    //   console.log("new user Signup");
    }).then(()=>{
        History.push("/AddDetails")
    });
  };

  return (
    <>
      {/* <h4>Sign up</h4>
      <br />
      <form onSubmit={handleSignup} id="signup-form">
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
        <div className="input-field">
          <input
            type="text"
            id="signup-password"
            placeholder="mobile Number"
            required
            value={mobileNumber}
            onChange={(e) => {
              setMobileNumber(e.target.value);
            }}
          />
        </div>
        <br />
        <br />
        <br />
        <button type="submit" className="btn yellow darken-2 z-depth-0">
          Sign up
        </button>
      </form> */}


      <div className="center">
        <h1>SignUp Form</h1>
        <form onSubmit={handleSignup}>

        <div className="txt-field">
            <input
              placeholder="UserName"
              type="text"
              name="UserName"
              value={mobileNumber}
            onChange={(e) => {
              setMobileNumber(e.target.value);
            }}
            ></input>
            {/* {errors.addresses && <span>{errors.addresses}</span>} */}
          </div>
          

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

export default SignUp;
