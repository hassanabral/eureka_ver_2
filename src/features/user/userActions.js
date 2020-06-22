import { toastr } from 'react-redux-toastr';
import {GET_USERS, ASYNC_ACTION_STARTED, ASYNC_ACTION_ERROR, ASYNC_ACTION_FINISHED} from './userSlice';

export const updateProfile = ({ firebase }, formData, history, uid) => {
  return async (dispatch) => {
    const { isLoaded, isEmpty, ...updatedUser } = formData;
    try {
      await firebase.updateProfile(updatedUser);
      dispatch(() => toastr.success('Success', 'Your profile has been updated'));
      history.push(`/users/${uid}`);
    } catch (error) {
      console.log(error);
    }
  };
}

export const getUsers = (firestore) => {
  return async (dispatch) => {
    const usersCollection = firestore.collection('users').orderBy('createdAt', 'desc');
    try {
      dispatch(ASYNC_ACTION_STARTED());
      const usersRef = await usersCollection.get();
      const users = usersRef.docs.map(doc => ({id: doc.id, ...doc.data()}));
      dispatch(GET_USERS(users));
      dispatch(ASYNC_ACTION_FINISHED());
    } catch (error) {
      console.log(error);
      dispatch(ASYNC_ACTION_ERROR());
    }
  };
}

// Feed model
// export const follow = ({firebase}, followed, follower) => {
//   const followersRef = firebase.collection('users').doc(followed);
//   followersRef.update({followings: union(follower)});
// }
//
// export const unfollow = ({firebase}, followed, follower) => {
//   const followersRef = firebase.collection('users').doc(followed);
//   followersRef.update({followings: remove(follower)});
// }

/**
 * I want to get the current user's followings' posts ordered by date 10 posts at a time.
 * @Todo: don't worry about this for now.
 */
// export const getFeed = ({firebase}) => {
//   return async (dispatch) => {
//     try {
//       // followings id
//       const {followings} = useSelector(state => state.firebase.profile);
//       const recentPosts = followings.map(followingId =>
// firebase.collectionGroup('posts') .where('authorId', '==', followingId)); })

// how about you






