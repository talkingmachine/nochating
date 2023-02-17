import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAKa0nRVXVCh25RsUN4sa-WDfMwYFzsaiE",
  authDomain: "rt-chat-dc531.firebaseapp.com",
  projectId: "rt-chat-dc531",
  storageBucket: "rt-chat-dc531.appspot.com",
  messagingSenderId: "1064480803286",
  appId: "1:1064480803286:web:bb3135a35ab0cd5ef6fc77"
};

//const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
