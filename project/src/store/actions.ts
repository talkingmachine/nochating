import { createAction } from '@reduxjs/toolkit';
import { UserType } from '../types/User';


export const setUser = createAction<UserType>('setUser');

export const setCurrentRoomChatId = createAction<string>('setCurrentRoomChatId');
export const setCurrentRoomPassword = createAction<string>('setCurrentRoomPassword');
export const setCurrentRoomId = createAction<string>('setCurrentRoomId');
export const setCurrentRoomIsPasswordPlateOpened = createAction<boolean>('setCurrentRoomIsPasswordPlateOpened');

export const setContextMenuIsOpen = createAction<boolean>('setContextMenuIsOpen');
export const setContextMenuType = createAction<string>('setContextMenuType');
export const setContextMenuCoords = createAction<{x: number; y: number}>('setContextMenuCoords');

export const setPasswordPlateState = createAction<string>('setPasswordPlateState');
