const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const FieldValue = require('firebase-admin').firestore.FieldValue;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.incrementLikeCount = functions.firestore.document('likes/{likeId}').onCreate(like => {
 const newLike = like.data();
 const postId = newLike.postId;

 return admin
   .firestore()
   .collection('posts')
   .doc(postId)
   .update({likeCount: FieldValue.increment(1)})
});

exports.decrementLikeCount = functions.firestore.document('likes/{likeId}').onDelete(like => {
 const newLike = like.data();
 const postId = newLike.postId;

 return admin
   .firestore()
   .collection('posts')
   .doc(postId)
   .update({likeCount: FieldValue.increment(-1)})
});