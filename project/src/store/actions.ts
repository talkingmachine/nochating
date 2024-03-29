import { createAction } from '@reduxjs/toolkit';
import { ContextMenuInfo, NewRoomInfo, PasswordPlateInfo, WarningMessageInfo } from '../types/Popups';
import { UserType } from '../types/User';

//user
export const setUser = createAction<UserType>('setUser');
//chats
export const setCurrentRoomChatId = createAction<string>('setCurrentRoomChatId');
//popups
export const setPasswordPlateInfo = createAction<PasswordPlateInfo>('setPasswordPlateInfo');
export const setNewRoomInfo = createAction<NewRoomInfo>('setNewRoomInfo');
export const setContextMenuInfo = createAction<ContextMenuInfo>('setContextMenuInfo');
export const setWarningMessageInfo = createAction<WarningMessageInfo>('setWarningMessageInfo');
//mobile
export const setOnTop = createAction<boolean>('setOnTop');
