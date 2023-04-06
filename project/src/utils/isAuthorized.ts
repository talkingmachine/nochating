import { USER_INFO } from '../consts/constUserInfo';
import { UserType } from '../types/User';

export const isAuthorized = (user: UserType) => user.uid !== USER_INFO.uid;
