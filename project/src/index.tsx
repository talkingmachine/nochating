import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { ContextType } from './types/Context';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
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

const storage = getStorage();
const database = getFirestore(app);
const auth = getAuth(app);

const signIn = () => signInWithPopup(auth, provider);
const logOut = () => signOut(auth);

export const GContext = createContext<ContextType>({signIn, logOut, database, storage});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <GContext.Provider value={{
      signIn,
      logOut,
      database,
      storage
    }}
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GContext.Provider>
  </Provider>
);
