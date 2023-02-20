import { UserCredential } from 'firebase/auth';
import { Database } from 'firebase/database';

export type ContextType = {
  signIn: () => Promise<UserCredential>;
  database: Database;
};
