import { UserType } from '../types/User';

export const USER_INFO: UserType = {
  photoURL: 'img/user-avatar1.jpg',
  displayName: 'JOIN US',
  uid: '0',
};

type RoomType = {
  formDefaultPicture: string;
};
export const ROOM_INFO: RoomType = {
  formDefaultPicture: 'img/default-room-create-image.svg',
};
