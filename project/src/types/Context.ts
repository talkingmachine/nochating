import { UserCredential } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { FirebaseStorage } from 'firebase/storage';

export type ContextType = {
  signIn: () => Promise<UserCredential>;
  database: Firestore;
  storage: FirebaseStorage;
};
