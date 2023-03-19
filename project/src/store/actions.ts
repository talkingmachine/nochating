import { createAction } from '@reduxjs/toolkit';
import { UserType } from '../types/User';

export const setUser = createAction<UserType>('setUser');
export const setCurrentRoomChatId = createAction<string>('setCurrentRoomChatId');
export const setCurrentRoomPassword = createAction<string>('setCurrentRoomPassword');
export const setCurrentRoomIsPasswordPlateOpened = createAction<boolean>('setCurrentRoomIsPasswordPlateOpened');
