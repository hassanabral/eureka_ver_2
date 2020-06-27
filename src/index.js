import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import firebase from './app/firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import ScrollToTop from './app/common/util/ScrollToTop';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';


const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};
const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <BrowserRouter>
            <ScrollToTop>
              <ReduxToastr
                position='bottom-right'
                transitionIn='fadeIn'
                transitionOut='fadeOut'
              />
              <App/>
            </ScrollToTop>
          </BrowserRouter>
        </ReactReduxFirebaseProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (module.hot) {
  module.hot.accept('./App', () => {
    setTimeout(render);
  });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
