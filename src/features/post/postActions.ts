import { showSuccess, showError } from '../../app/snackbar';
import { readIds } from '../../app/common/util/helpers';
import { db, fieldValue } from '../../app/firebase';

import {
  GET_BOOKMARKS, ADD_BOOKMARK, REMOVE_BOOKMARK,
  GET_TAGS, ADD_TAG, GET_POSTS_BY_TAG, SELECT_TAG,
  ASYNC_ACTION_STARTED, ASYNC_ACTION_FINISHED, ASYNC_ACTION_ERROR,
  NO_MORE_FEEDS, FETCH_FEEDS, INCREMENT_TAG
} from './postSlice';

export const getPagedFeeds = () =>
  async (dispatch, getState) => {
    try {
      dispatch(ASYNC_ACTION_STARTED());
      const LIMIT = 3;
      let nextPostSnapshot = null;
      const feeds = getState().post.feeds;
      // after the first time we get feeds from backend
      if (feeds && feeds.length >= LIMIT) {
        nextPostSnapshot =
          await db.collection('posts').doc(feeds[feeds.length - 1].id)
            .get();
      }

      const feedsCollectionRef = db.collection('posts').orderBy('date', 'desc')
        .where('status', '==', 'published')
        .where('deleted', '==', false);
      let feedsSnap;

      if (nextPostSnapshot) {
        feedsSnap = await feedsCollectionRef.startAfter(nextPostSnapshot).limit(LIMIT).get();
      } else {
        feedsSnap = await feedsCollectionRef.limit(LIMIT).get();
      }
      const newFeeds = feedsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      dispatch(FETCH_FEEDS(newFeeds));

      if (feedsSnap.docs.length < LIMIT) {
        dispatch(NO_MORE_FEEDS());
      }
      dispatch(ASYNC_ACTION_FINISHED());
    } catch (e) {
      console.log('error', e);
      dispatch(ASYNC_ACTION_ERROR());
    }

  };

export const createPost = (newPost: any) => {
  return async (dispatch, getState) => {
    const user = getState().auth.currentUser;
    try {
      const newPostTemp = createNewPost(newPost, user);
      const newPostFinal = await db.collection('posts').add(newPostTemp);

      // add a tag
      const tagsState = getState().post.tags;
      if (tagsState && newPostTemp.hashtags) {
        const currentTags = tagsState.map(tag => tag.name);

        newPostTemp.hashtags.forEach(tag => {
          if (!currentTags.includes(tag)) {
            dispatch(ADD_TAG({
              name: tag,
              count: 1
            }));
          } else {
            dispatch(INCREMENT_TAG(tag));
          }
        });
      }
      showSuccess('Post has been created');
      return newPostFinal;
    } catch (error) {
      showError('Something went wrong');
    }
  };
};

export const deletePost = async (postId: string) => {
  try {
    await db.collection('posts').doc(postId).update({
      deleted: true,
      body: '<p>[Deleted]</p>'
    });
    showSuccess('Post has been deleted');
  } catch (error) {
    console.log('err', error);
    showError('Something went wrong');
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const commentRef = await db.collectionGroup('comments')
      .where('id', '==', commentId);
    const querySnapshot = await commentRef.get();
    await querySnapshot.docs[0].ref.update({
      commentBody: '<p>[Deleted]</p>'
    });
    showSuccess('Comment has been deleted');
  } catch (error) {
    console.log('err', error);
    showError('Something went wrong');
  }
};

export const likeOrUnlike = (postId: string) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.currentUser?.uid;
    const likeId = `${uid}_${postId}`;
    try {
      const likeRef = await db.collection('likes').doc(likeId);
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
      showError('Something went wrong');
    }
  };
};

export const savePost = (postId: string) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.currentUser?.uid;
    const bookmarkId = `${uid}_${postId}`;
    try {
      const bookmarkRef = db.collection('bookmarks').doc(bookmarkId);
      const bookmarkSnapshot = await bookmarkRef.get();
      const bookmarkExists = bookmarkSnapshot.exists;

      if (bookmarkExists) {
        bookmarkRef.delete();
        dispatch(REMOVE_BOOKMARK(postId));
        showSuccess('Post is removed from your bookmarks.');
      } else {
        bookmarkRef.set({
          userId: uid,
          postId
        });
        const postRef = await db.collection('posts').doc(postId).get();
        dispatch(ADD_BOOKMARK({ id: postRef.id, ...postRef.data() }));
        showSuccess('Post is saved to your bookmarks.');
      }

    } catch (error) {
      console.log('error', error);
      showError('Something went wrong');
    }
  };
};

export const toggleBookmark = (postId: string, setSaved: Function) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.currentUser?.uid;
    const bookmarkId = `${uid}_${postId}`;
    try {
      db.collection('bookmarks').doc(bookmarkId).onSnapshot((bookmarkSnapShot) => {
        const alreadySaved = bookmarkSnapShot.exists;
        setSaved(alreadySaved);
      });
    } catch (error) {
      console.log('err', error);
      showError('Something went wrong');
    }
  };
};

export const getBookmarks = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.currentUser?.uid;

    try {
      dispatch(ASYNC_ACTION_STARTED());
      const bookmarksRef = await db.collection('bookmarks')
        .where('userId', '==', uid).get();
      const postIds = bookmarksRef.docs.map(doc => doc.data().postId);
      const bookmarks = await readIds('posts', postIds);
      dispatch(GET_BOOKMARKS(bookmarks));
      dispatch(ASYNC_ACTION_FINISHED());
    } catch (error) {
      console.log('err', error);
      showError('Something went wrong');
      dispatch(ASYNC_ACTION_ERROR());
    }
  };
};

export const likeOrUnlikeComment = (commentId: string) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.currentUser?.uid;
    const likeId = `${uid}_${commentId}`;
    try {
      const likeRef = await db.collection('likesComment').doc(likeId);
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
      showError('Something went wrong');
    }
  };
};

export const toggleLikeComment = (commentId: string, setLike: Function) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.currentUser?.uid;
    const likeId = `${uid}_${commentId}`;
    try {
      db.collection('likesComment').doc(likeId).onSnapshot((likeSnapShot) => {
        const alreadyLiked = likeSnapShot.exists;
        setLike(alreadyLiked);
      });
    } catch (error) {
      console.log('err', error);
      showError('Something went wrong');
    }
  };
};

export const toggleLike = (postId: string, setLike: Function) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.currentUser?.uid;
    const likeId = `${uid}_${postId}`;
    try {
      db.collection('likes').doc(likeId).onSnapshot((likeSnapShot) => {
        const alreadyLiked = likeSnapShot.exists;
        setLike(alreadyLiked);
      });
    } catch (error) {
      console.log('err', error);
      showError('Something went wrong');
    }
  };
};

export const addComment = (formData: any, postId: string) => {
  return async (dispatch, getState) => {
    const user = getState().auth.currentUser;
    try {
      const newCommentTemp = createNewComment(formData, user);
      const commentRef = await db.collection('posts').doc(postId)
        .collection('comments').add(newCommentTemp);
      await commentRef.update({ id: commentRef.id });
      showSuccess('Commented added');
    } catch (error) {
      showError('Something went wrong');
    }
  };
};

export const addReply = (formData: any, commentId: string, setToggleReplies: Function) => {
  return async (dispatch, getState) => {
    const user = getState().auth.currentUser;
    try {
      const newReply = createNewComment(formData, user);

      const commentRef = db.collectionGroup('comments')
        .where('id', '==', commentId);
      commentRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.collection('comments').add(newReply).then(
            (doc) => {
              doc.update({ id: doc.id }).then(
                () => setToggleReplies(true)
              );
            }
          );
        });
      }).catch(function (error) {
        console.log('Error getting documents: ', error);
      });

      showSuccess('Reply added');
    } catch (error) {
      console.log({ error });
      showError('Something went wrong');
    }
  };
};

export const updatePost = (formData: any, postId: string) => {
  return async (dispatch, getState) => {
    try {
      await db.collection('posts').doc(postId).update(formData);
      showSuccess('Post has been updated');
    } catch (error) {
      showError('Something went wrong');
    }
  };
};

export const getReplies = async (commentId: string, setReplies: Function, setLoading: Function) => {
  try {
    setLoading(true);
    const commentRef = await db.collectionGroup('comments')
      .where('id', '==', commentId);
    const querySnapshot = await commentRef.get();
    await querySnapshot.forEach((doc) => {
      doc.ref.collection('comments').orderBy('date', 'desc')
        .onSnapshot((repliesSnap) => {
            const replies = repliesSnap.docs.map(doc => doc.data());
            if(replies) {
              setReplies(replies);
            }
          }
        );
    });
    setLoading(false);

  } catch (error) {
    console.log('Error getting documents: ', error);
    showError('Something went wrong');
  }
};

const createNewPost = (newPostData, user) => {
  const { uid, displayName, photoURL } = user;
  return {
    ...newPostData,
    date: fieldValue.serverTimestamp(),
    authorId: uid,
    authorName: displayName,
    authorPhotoURL: photoURL,
    deleted: false,
    likeCount: 0,
    commentCount: 0,
    savedCount: 0
  };
};

const createNewComment = (newCommentData, user) => {
  const { uid, displayName, photoURL } = user;
  return {
    ...newCommentData,
    date: fieldValue.serverTimestamp(),
    authorId: uid,
    authorName: displayName,
    authorPhotoURL: photoURL,
    likeCount: 0,
    commentCount: 0
  };
};

export const getTags = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(ASYNC_ACTION_STARTED());
      const tagsRef = await db.collection('tags').orderBy('count').get();
      const tags = tagsRef.docs.map(doc => doc.data());
      dispatch(GET_TAGS(tags));
      dispatch(ASYNC_ACTION_FINISHED());
    } catch (error) {
      console.log('err', error);
      showError('Something went wrong');
      dispatch(ASYNC_ACTION_ERROR());
    }
  };
};

export const getPostsByTag = (tagId: string) => {
  return async (dispatch, getState) => {
    try {
      dispatch(ASYNC_ACTION_STARTED());
      const postsRef = await db.collection('posts')
        .where('hashtags', 'array-contains', tagId)
        .where('deleted', '==', false)
        .orderBy('date', 'desc')
        .get();

      const posts = postsRef.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      dispatch(SELECT_TAG(tagId));
      dispatch(GET_POSTS_BY_TAG(posts));
      dispatch(ASYNC_ACTION_FINISHED());
    } catch (error) {
      console.log('err', error);
      showError('Something went wrong');
      dispatch(ASYNC_ACTION_ERROR());
    }
  };
};
