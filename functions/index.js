const functions = require('firebase-functions');
const express = require('express');
// const cors = require('cors');

const admin = require('firebase-admin');


const app = express();

admin.initializeApp();



app.get("/",async(req,res)=>{
  const snapshot = await admin.firestore().collection('emailData').get();

  let users = [];

  snapshot.forEach(doc =>{
  let id = doc.id;
  let data = doc.data();

  users.push({id,...data});
})
res.status(200).send(JSON.stringify(users));
})



exports.user = functions.https.onRequest(app);

exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true,salesManager:false,
    })
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made an admin.`
    }
  }).catch(err => {
    return err;
  });
});