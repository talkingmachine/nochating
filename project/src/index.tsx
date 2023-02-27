import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {initializeApp} from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { ContextType } from './types/Context';
import { getFirestore } from 'firebase/firestore';
import { Provider } from 'react-redux';
import { store } from './store';


const firebaseConfig = {
  apiKey: 'AIzaSyAKa0nRVXVCh25RsUN4sa-WDfMwYFzsaiE',
  authDomain: 'rt-chat-dc531.firebaseapp.com',
  databaseURL: 'https://rt-chat-dc531-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'rt-chat-dc531',
  storageBucket: 'rt-chat-dc531.appspot.com',
  messagingSenderId: '1064480803286',
  appId: '1:1064480803286:web:bb3135a35ab0cd5ef6fc77'
};


const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);

const database = getFirestore(app);
const auth = getAuth(app);

const signIn = () => signInWithPopup(auth, provider);
//.catch((error) => {
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
  <Provider store={store}>
    <GContext.Provider value={{
      signIn,
      database,
    }}
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GContext.Provider>
  </Provider>
);
