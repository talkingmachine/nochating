import { USER_INFO } from '../consts/constUserInfo';
import { LOCAL_STORAGE_NAMES } from '../consts/localStorageNames';

export const uploadStorageInfo = () => {
  const user = {
    displayName: localStorage.getItem(LOCAL_STORAGE_NAMES.userDisplayName) || USER_INFO.displayName,
    photoURL: localStorage.getItem(LOCAL_STORAGE_NAMES.userPhotoURL) || USER_INFO.photoURL,
    uid: localStorage.getItem(LOCAL_STORAGE_NAMES.userUID) || USER_INFO.uid
  };

  return user;
};
