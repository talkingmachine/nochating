import { LOCAL_STORAGE_NAMES } from '../consts/localStorageNames';

export const uploadStorageInfo = () => {
  const user = {
    displayName: localStorage.getItem(LOCAL_STORAGE_NAMES.userDisplayName) || 'Incognito',
    photoURL: localStorage.getItem(LOCAL_STORAGE_NAMES.userPhotoURL) || 'img/user-avatar1.jpg',
    uid: localStorage.getItem(LOCAL_STORAGE_NAMES.userUID) || ''
  };

  return user;
};
