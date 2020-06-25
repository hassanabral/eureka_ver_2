const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const FieldValue = admin.firestore.FieldValue;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.incrementPostLikeCount =
  functions.firestore.document('likes/{likeId}').onCreate(like => {
    const newLike = like.data();
    const postId = newLike.postId;

    return admin
      .firestore()
      .collection('posts')
      .doc(postId)
      .update({ likeCount: FieldValue.increment(1) });
  });

exports.decrementPostLikeCount =
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

exports.incrementCommentLikeCount =
  functions.firestore.document('likesComment/{likeId}').onCreate(like => {
    const newLike = like.data();
    const commentId = newLike.commentId;

    return admin
      .firestore()
      .collectionGroup('comments')
      .where('id', '==', commentId)
      .get()
      .then((querySnapshot) =>
        querySnapshot.docs[0].ref.update({ likeCount: FieldValue.increment(1) })
      );
  });

exports.decrementCommentLikeCount =
  functions.firestore.document('likesComment/{likeId}').onDelete(like => {
    const newLike = like.data();
    const commentId = newLike.commentId;

    return admin
      .firestore()
      .collectionGroup('comments')
      .where('id', '==', commentId)
      .get()
      .then((querySnapshot) =>
        querySnapshot.docs[0].ref.update({ likeCount: FieldValue.increment(-1) })
      );
  });

exports.addTag = functions.firestore.document('posts/{postId}')
  .onCreate(async (post) => {
    const postData = post.data();
    const tags = postData.hashtags;

    if (tags) {
      const tagsCollectionRef = admin.firestore().collection('tags');
      const reads = tags.map(async tag => {
        const tagRef = tagsCollectionRef.doc(tag);
        const tagData = await tagRef.get();
        const tagAlreadyExists = tagData.exists;

        if (tagAlreadyExists) {
          return tagRef.update({
            count: FieldValue.increment(1)
          });
        } else {
          return tagRef.set({
            name: tag,
            count: 1
          });
        }
      });

      return Promise.all(reads).then(results => {
          return results;
        }
      );
    } else {
      return null;
    }
  });