import { toastr } from 'react-redux-toastr';
import { reset } from 'redux-form';

export const createPost = ({ firebase, firestore }, newPost) => {
  return async (dispatch, getState) => {
    const user = getState().firebase.auth;
    try {
      const newPostTemp = createNewPost(newPost, user, firestore);
      const newPostFinal = await firestore.collection('posts').add(newPostTemp);
      toastr.success('Success!', 'Post has been created');
      return newPostFinal;
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const addComment = ({ firebase, firestore }, formData, postId) => {
  return async (dispatch, getState) => {
    const user = getState().firebase.auth;
    try {
      const newCommentTemp = createNewComment(formData, user, firestore);
      const commentRef = await firestore.collection('posts').doc(postId)
        .collection('comments').add(newCommentTemp);
      await commentRef.update({ id: commentRef.id });
      dispatch(reset('addCommentForm'));
      toastr.success('Success!', 'Commented added');
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const addReply = ({ firestore }, formData, commentId) => {
  return async (dispatch, getState) => {
    const user = getState().firebase.auth;
    console.log({ commentId });
    try {
      const newReply = createNewComment(formData, user, firestore);

      const commentRef = firestore.collectionGroup('comments')
        .where('id', '==', commentId);
      commentRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.collection('comments').add(newReply).then(
            (doc) => {
              doc.update({ id: doc.id });
            }
          );
        });
      }).catch(function (error) {
        console.log('Error getting documents: ', error);
      });

      dispatch(reset('addReplyForm'));
      toastr.success('Success!', 'Reply added');
    } catch (error) {
      console.log({ error });
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const updatePost = ({ firestore }, formData, history, postId) => {
  return async (dispatch, getState) => {
    try {
      await firestore.collection('posts').doc(postId).update(formData);
      toastr.success('Success!', 'Post has been updated');
      history.push(`/posts/${postId}`);
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const getReplies = (firestore, commentId) => {
  return async (dispatch, getState) => {
    try {
      const commentRef = firestore.collectionGroup('comments')
        .where('id', '==', commentId);
      const otherReplies = commentRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.collection('comments').orderBy('date', 'desc')
            .get().then((repliesSnap) => {
              const replies = repliesSnap.docs.map(doc => doc.data());
              console.log({ replies });
              return replies;
            }
          )
        });
      }).catch(function (error) {
        console.log('Error getting documents: ', error);
      });
      return otherReplies;

    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
  }
};

export const getFeed = ({ firebase, firestore }) => {
  return async (dispatch, getState) => {
    try {
      const feedRef = await firestore.collection('posts')
        .where('status', '==', 'published')
        .orderBy('date', 'desc')
        .get();
      return feedRef.docs.map(doc => doc.data());
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

const createNewPost = (newPostData, user, firestore) => {
  const { uid, displayName, photoURL } = user;
  return {
    ...newPostData,
    date: firestore.FieldValue.serverTimestamp(),
    authorId: uid,
    authorName: displayName,
    authorPhotoURL: photoURL,
    likeCount: 0,
    commentCount: 0,
    savedCount: 0
  };
};

const createNewComment = (newCommentData, user, firestore) => {
  const { uid, displayName, photoURL } = user;
  return {
    ...newCommentData,
    date: firestore.FieldValue.serverTimestamp(),
    authorId: uid,
    authorName: displayName,
    authorPhotoURL: photoURL,
    likeCount: 0,
    commentCount: 0
  };
};