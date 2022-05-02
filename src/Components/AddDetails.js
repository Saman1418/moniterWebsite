import React, { useState, useEffect } from "react";
import "./AddDetails.css";
import firebase from "../Firebase/FirebaseConfig";
const db = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();

const AddDetails = () => {
  const [docs, setDocs] = useState([]);
  const [name, setName] = useState("");
  const [website, setWebSite] = useState("");
  const [bio, setBio] = useState("");
  const [userUID, setUserUID] = useState("");
  const [emailState, setEmailState] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

  const handleActiveState = (e) => {
    setEmailState(e.target.value);
  };

  auth.onAuthStateChanged((user) => {
    if (user != null) {
      setUserUID(user.uid);
      user.getIdTokenResult().then((idTokenResult) => {
        // console.log(idTokenResult.claims.admin);
        // console.log("salesManger", idTokenResult.claims);
        user.admin = idTokenResult.claims.admin;
        // setupUI(user);
      });
    }
  });

  // const handleAdmin = (e)=>{
  //   e.preventDefault()
  //   const addAdminRole = functions.httpsCallable('addAdminRole');
  //   addAdminRole({ email: adminEmail }).then(result => {
  //     console.log(result);
  //   });
  // }

  // console.log(userUID)

  //   const renderData = (doc) => {
  // console.log("list", doc.data());
  // setName(doc.data().name)
  // setWebsite(doc.data().website)
  //   };

  //   db.collection("emailData")
  //     .get()
  //     .then((snapshot) => {
  //         let documents = [];
  //       snapshot.docs.forEach((doc) => {
  //           documents.push({...doc.data(),id:doc.id})
  //         // renderData(doc);
  //       });
  //       setUserData(documents)
  //     });

  useEffect(() => {
    // db.collection('users').doc(user.uid).get().then(doc => {
    //   setBio(doc.data().bio)
    //   // <div>${doc.data().bio}</div>
    // });

    const unsub = db
      .collection("emailData")
      .where("uid", "==", userUID)
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          // console.log(doc.data());
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });
    return () => unsub();
  }, [userUID]);

  // console.log(docs)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, website, emailState);
    db.collection("emailData").add({
      uid: userUID,
      name,
      website,
      urlState: emailState,
    });
    setName("");
    setWebSite("");
  };

  const handleDelete = (id) => {
    db.collection("emailData").doc(id).delete();
  };

  return (
    <>
     

      <h1>{bio != undefined ? bio : "user"} Website Url</h1>

      <div className="content">
        <div className="d-flex align-items-center justify-content-center">
        <div className="centers d-flex justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="txt-field">
              <input
                type="text"
                name="Name"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="txt-field">
              <input
                type="text"
                name="Website"
                placeholder="Website"
                value={website}
                onChange={(e) => {
                  setWebSite(e.target.value);
                }}
              />
            </div>

            <div className="d-flex align-items-center">
              <input
                className="radio"
                type="radio"
                id="Active"
                name="fav_language"
                value="Active"
                required
                onChange={handleActiveState}
              />
              <label htmlFor="html">Active</label>
              <br />
            </div>

            <div className="d-flex align-items-center">
            <input
              className="radio"
              type="radio"
              id="InActive"
              name="fav_language"
              value="InActive"
              required
              onChange={handleActiveState}
            />
            <label htmlFor="css">InActive</label>
            </div>
            <input className="btn btn-success" type="submit" value="Add"></input>
          </form>
        </div>
        </div>

        <div>
          <table class="ui selectable inverted table">
            <thead>
              <tr>
                <th>UserName</th>
                <th>Website Url</th>
                <th>Url State</th>
              </tr>
            </thead>

            {docs &&
              docs.map((item) => {
                return (
                  <tbody>
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.website}</td>
                      <td>{item.urlState}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      </div>
    </>
  );
};

export default AddDetails;
