import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {initializeApp} from 'firebase/app';
import 'firebase/firestore';
import {auth}'firebase/auth';

initializeApp({
  apiKey: 'AIzaSyAKa0nRVXVCh25RsUN4sa-WDfMwYFzsaiE',
  authDomain: 'rt-chat-dc531.firebaseapp.com',
  projectId: 'rt-chat-dc531',
  storageBucket: 'rt-chat-dc531.appspot.com',
  messagingSenderId: '1064480803286',
  appId: '1:1064480803286:web:bb3135a35ab0cd5ef6fc77'
});

git status
const Context = createContext(null);
const auth = firebase.auth();
console.log(auth);
const firestore = firebase.firestore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Context.Provider value={{auth, firebase, firestore}}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>,
);
