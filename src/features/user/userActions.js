import {toastr} from 'react-redux-toastr';
import firebase from '../../app/firebase';

export const updateProfile = ({firebase}, formData, history, uid) => {
  return async (dispatch) => {
    const {isLoaded, isEmpty, ...updatedUser} = formData;
    try {
      await firebase.updateProfile(updatedUser);
      dispatch(() => toastr.success('Success', 'Your profile has been updated'));
      history.push(`/users/${uid}`)
    } catch (error) {
      console.log(error);
    }
  };
};