import React, { useState, useEffect } from "react";
// import ProgressBar from './ProgressBar';
import firebase from "../Firebase/FirebaseConfig";
const storage = firebase.storage();
const auth = firebase.auth();
const projectFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

const DisplayMedia = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [docs, setDocs] = useState([]);
  const [userUID, setUserUID] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  auth.onAuthStateChanged((user) => {
    if(user!=null){
      setUserUID(user.uid);
    }
    
  });

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    const collectionRef = projectFireStore.collection("media");
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            const createdAt = timestamp();
            // auth.onAuthStateChanged((user) => {
            //   if (user) {
            collectionRef.add({ uid: userUID, url, createdAt });
            //   }
            // });
            // collectionRef.add({url,createdAt });
          });
      }
    );
  };

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       console.log("uid", user.uid);
  //       const unsub = projectFireStore
  //         .collection("media")
  //         // .orderByChild("type").startAt("audio")
  //         .where("uid", "==", user.uid)
  //         // .orderBy("createdAt","desc")
  //         .onSnapshot((snap) => {
  //           let documents = [];
  //           snap.forEach((doc) => {
  //             // console.log(doc.data())
  //             documents.push({ ...doc.data(), id: doc.id });
  //           });
  //           setDocs(documents);
  //         });
  //       return () => unsub();
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const unsub = projectFireStore
      .collection("media")
      // .orderByChild("type").startAt("audio")
      .where("uid", "==", userUID)
      // .orderBy("createdAt","desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          // console.log(doc.data())
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
        
      });
    return () => unsub();
    
  }, [userUID]);
  // console.log("image: ", docs);

  return (
    <>
      <div>
        <progress value={progress} max="100" />
        <br />
        <br />
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
        <br />

        <br />
        {docs &&
          docs.map((item) => {
            return (
              <div key={item.id} style={{display:"inline-block"}}>
                <img
                  src={item.url}
                  alt="firebase-image"
                  width="50px"
                  height="50px"
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default DisplayMedia;

// const msg = firebase.messaging();
// msg
//   .requestPermission()
//   .then(() => {
//     return msg.getToken();
//   })
//   .then((data) => {
//     console.log("token", data);
//   })
//   .catch(() => {
//     console.log("error");
//   });
