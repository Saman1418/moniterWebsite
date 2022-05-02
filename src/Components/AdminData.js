import React, { useEffect, useState } from "react";
import firebase from "../Firebase/FirebaseConfig";
const db = firebase.firestore();
const auth = firebase.auth();

const AdminData = () => {
  const [userUID, setUserUID] = useState("");
  const [docs, setDocs] = useState([]);

  auth.onAuthStateChanged((user) => {
    if (user != null) {
      setUserUID(user.uid);
    }
  });
  useEffect(() => {
    const unsub = db
      .collection("emailData")
      //   .where("uid", "==", userUID)
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          console.log(doc.data());
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });
    return () => unsub();
  }, [userUID]);

  return (
    <>
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
                      {/* <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                          Delete
                        </button> */}
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
    </>
  );
};

export default AdminData;
