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

export const deletePost = async (firestore, postId) => {
    try {
      await firestore.collection('posts').doc(postId).update({
        deleted: true,
        body: '<p>[Deleted]</p>'
      });
      toastr.success('Success!', 'Post has been deleted');
    } catch (error) {
      console.log('err', error);
      toastr.error('Oops', 'Something went wrong');
    }
};

export const deleteComment = async (firestore, commentId) => {
  try {
    const commentRef = await firestore.collectionGroup('comments')
      .where('id', '==', commentId);
    const querySnapshot = await commentRef.get();
    await querySnapshot.docs[0].ref.update({
        commentBody: '<p>[Deleted]</p>'
      })
    toastr.success('Success!', 'Comment has been deleted');
  } catch (error) {
    console.log('err', error);
    toastr.error('Oops', 'Something went wrong');
  }
};

export const likeOrUnlike = ({ firebase, firestore }, postId) => {
  return async (dispatch, getState) => {
    const {uid} = getState().firebase.auth;
    const likeId = `${uid}_${postId}`;
    try {
      const likeRef = await firestore.collection('likes').doc(likeId);
      likeRef.get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            likeRef.delete();
          } else {
            likeRef.set({
              userId: uid,
              postId
            });
          }
        });
    } catch (error) {
      console.log('error', error);
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const likeOrUnlikeComment = ({ firebase, firestore }, commentId) => {
  return async (dispatch, getState) => {
    const {uid} = getState().firebase.auth;
    const likeId = `${uid}_${commentId}`;
    try {
      const likeRef = await firestore.collection('likesComment').doc(likeId);
      likeRef.get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            likeRef.delete();
          } else {
            likeRef.set({
              userId: uid,
              commentId
            });
          }
        });
    } catch (error) {
      console.log('error', error);
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const toggleLikeComment = (firestore, commentId, setLike) => {
  return async (dispatch, getState) => {
    const {uid} = getState().firebase.auth;
    const likeId = `${uid}_${commentId}`;
    try {
      firestore.collection('likesComment').doc(likeId).onSnapshot((likeSnapShot) => {
        const alreadyLiked = likeSnapShot.exists;
        setLike(alreadyLiked);
      })
    } catch (error) {
      console.log('err', error);
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const toggleLike = (firestore, postId, setLike) => {
  return async (dispatch, getState) => {
    const {uid} = getState().firebase.auth;
    const likeId = `${uid}_${postId}`;
    try {
      firestore.collection('likes').doc(likeId).onSnapshot((likeSnapShot) => {
        const alreadyLiked = likeSnapShot.exists;
        setLike(alreadyLiked);
      })
    } catch (error) {
      console.log('err', error);
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
          )
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

export const getReplies = async (firestore, commentId, setReplies) => {
  try {
    const commentRef = await firestore.collectionGroup('comments')
      .where('id', '==', commentId);
    const querySnapshot = await commentRef.get();
    await querySnapshot.forEach((doc) => {
      doc.ref.collection('comments').orderBy('date', 'desc')
        .onSnapshot((repliesSnap) => {
            const replies = repliesSnap.docs.map(doc => doc.data());
            setReplies(replies);
          }
        )
    })

  } catch (error) {
    console.log('Error getting documents: ', error);
    toastr.error('Oops', 'Something went wrong');
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
    deleted: false,
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