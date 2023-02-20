import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app/app';
import {initializeApp} from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { ContextType } from './types/Context';


const firebaseConfig = {
  apiKey: 'AIzaSyAKa0nRVXVCh25RsUN4sa-WDfMwYFzsaiE',
  authDomain: 'rt-chat-dc531.firebaseapp.com',
  projectId: 'rt-chat-dc531',
  storageBucket: 'rt-chat-dc531.appspot.com',
  messagingSenderId: '1064480803286',
  appId: '1:1064480803286:web:bb3135a35ab0cd5ef6fc77',
  databaseURL: 'https://rt-chat-dc531-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const provider = new GoogleAuthProvider();

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const signIn = () => signInWithPopup(auth, provider);
//.then((result) => {
//  const credential = GoogleAuthProvider.credentialFromResult(result);// This gives you a Google Access Token. You can use it to access the Google API.
//  const token = credential ? credential.accessToken : null;
//  const user = result.user;// The signed-in user info.
//}).catch((error) => {
//const errorCode = error.code;
//const errorMessage = error.message;
//const email = error.customData.email;// The email of the user's account used.
//const credential = GoogleAuthProvider.credentialFromError(error);// The AuthCredential type that was used.
//});


export const GContext = createContext<ContextType>({signIn, database});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <GContext.Provider value={{
    signIn,
    database,
  }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GContext.Provider>,
);
