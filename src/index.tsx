import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { auth } from './app/firebase';
import { SET_AUTH, CLEAR_AUTH } from './features/auth/authSlice';
import ScrollToTop from './app/common/util/ScrollToTop';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

// Listen for auth state changes and dispatch to Redux
auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(SET_AUTH({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
    }));
  } else {
    store.dispatch(CLEAR_AUTH());
  }
});

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <ReduxToastr
            position='bottom-right'
            transitionIn='fadeIn'
            transitionOut='fadeOut'
          />
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
