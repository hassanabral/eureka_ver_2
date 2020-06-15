const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const FieldValue = admin.firestore.FieldValue;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.incrementLikeCount =
  functions.firestore.document('likes/{likeId}').onCreate(like => {
    const newLike = like.data();
    const postId = newLike.postId;

    return admin
      .firestore()
      .collection('posts')
      .doc(postId)
      .update({ likeCount: FieldValue.increment(1) });
  });

exports.decrementLikeCount =
  functions.firestore.document('likes/{likeId}').onDelete(like => {
    const newLike = like.data();
    const postId = newLike.postId;

    return admin
      .firestore()
      .collection('posts')
      .doc(postId)
      .update({ likeCount: FieldValue.increment(-1) });
  });

exports.incrementCommentCountLvl1 =
  functions.firestore.document('posts/{postId}/comments/{commentId}')
    .onCreate((comment, context) => {
      const postId = context.params.postId;

      return admin
        .firestore()
        .doc(`posts/${postId}`)
        .update({ commentCount: FieldValue.increment(1) });
    });

exports.incrementCommentCountLvl2 =
  functions.firestore.document(
    'posts/{postId}/comments/{commentId1}/comments/{commentId2}')
    .onCreate((comment, context) => {
      const postId = context.params.postId;
      const commentId1 = context.params.commentId1;

      return admin
        .firestore()
        .doc(`posts/${postId}/comments/${commentId1}`)
        .update({ commentCount: FieldValue.increment(1) });
    });

exports.incrementCommentCountLvl3 =
  functions.firestore.document(
    'posts/{postId}/comments/{commentId1}/comments/{commentId2}/comments/{commentId3}')
    .onCreate((comment, context) => {
      const postId = context.params.postId;
      const commentId1 = context.params.commentId1;
      const commentId2 = context.params.commentId2;

      return admin
        .firestore()
        .doc(`posts/${postId}/comments/${commentId1}/comments/${commentId2}`)
        .update({ commentCount: FieldValue.increment(1) });
    });

exports.incrementCommentCountLvl4 =
  functions.firestore.document(
    'posts/{postId}/comments/{commentId1}/comments/{commentId2}/comments/{commentId3}/comments/{commentId4}')
    .onCreate((comment, context) => {
      const postId = context.params.postId;
      const commentId1 = context.params.commentId1;
      const commentId2 = context.params.commentId2;
      const commentId3 = context.params.commentId3;

      return admin
        .firestore()
        .doc(
          `posts/${postId}/comments/${commentId1}/comments/${commentId2}/comments/${commentId3}`)
        .update({ commentCount: FieldValue.increment(1) });
    });
