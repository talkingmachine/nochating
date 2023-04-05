import { FieldValue } from 'firebase/firestore';

export type RoomInfoDocumentData = {
  id: string;
  title: string;
  password: string;
  picture : string;
  owner: string;
  chatId: string;
  createdAt: FieldValue;
}

export type MessageInfoDocumentData = {
  id: string;
  username: string;
  authorID: string;
  email: string;
  profilePicture: string;
  message: string;
  createdAt: FieldValue;
}

