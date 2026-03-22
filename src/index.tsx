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
import { SnackbarProvider, useSnackbar } from 'notistack';
import { setSnackbarRef } from './app/snackbar';

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

// Bridge component to capture notistack ref for use outside React
function SnackbarRefBridge() {
  const snackbar = useSnackbar();
  React.useEffect(() => {
    setSnackbarRef(snackbar);
  }, [snackbar]);
  return null;
}

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <SnackbarRefBridge />
        <BrowserRouter>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);
