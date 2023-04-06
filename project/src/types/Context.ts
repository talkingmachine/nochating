import { UserCredential } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { FirebaseStorage } from 'firebase/storage';

export type ContextType = {
  signIn: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
  database: Firestore;
  storage: FirebaseStorage;
};
