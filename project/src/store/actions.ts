import { createAction } from '@reduxjs/toolkit';
import { UserType } from '../types/User';


export const setUser = createAction<UserType>('setUser');

export const setCurrentRoomChatId = createAction<string>('setCurrentRoomChatId');
export const setCurrentRoomPassword = createAction<string>('setCurrentRoomPassword');
export const setCurrentRoomId = createAction<string>('setCurrentRoomId');
export const setCurrentRoomIsPasswordPlateOpened = createAction<boolean>('setCurrentRoomIsPasswordPlateOpened');

export const setPasswordPlateState = createAction<string>('setPasswordPlateState');
