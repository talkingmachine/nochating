import { UserCredential } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

export type ContextType = {
  signIn: () => Promise<UserCredential>;
  database: Firestore;
};
