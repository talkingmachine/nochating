import { createReducer } from '@reduxjs/toolkit';
import { ALT_MENU_TYPES } from '../consts/altMenuTypes';
import { USER_INFO } from '../consts/constUserInfo';
import { UserType } from '../types/User';
import { setContextMenuCoords, setContextMenuIsOpen, setContextMenuType, setCurrentRoomChatId, setCurrentRoomId, setCurrentRoomIsPasswordPlateOpened, setCurrentRoomPassword, setUser } from './actions';

type InitialStateType = {
  user: UserType;
  currentRoomInfo: {
    id: string;
    chatId: string;
    isPasswordPlateOpened: boolean;
    password: string;
  };
  altContextMenu: {
    isOpen: boolean;
    coords: {
      x: number;
      y: number;
    };
    menuType: string;
  };
}
const initialState: InitialStateType = {
  user: USER_INFO,
  currentRoomInfo: {
    id: '',
    chatId: '',
    isPasswordPlateOpened: false,
    password: ''
  },
  altContextMenu: {
    isOpen: false,
    coords: {
      x: 0,
      y: 0
    },
    menuType: ALT_MENU_TYPES.undefinedType,
  }
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setCurrentRoomId, (state, action) => {
      state.currentRoomInfo.id = action.payload;
    })
    .addCase(setCurrentRoomChatId, (state, action) => {
      state.currentRoomInfo.chatId = action.payload;
    })
    .addCase(setCurrentRoomIsPasswordPlateOpened, (state, action) => {
      state.currentRoomInfo.isPasswordPlateOpened = action.payload;
    })
    .addCase(setCurrentRoomPassword, (state, action) => {
      state.currentRoomInfo.password = action.payload;
    })
    .addCase(setContextMenuIsOpen, (state, action) => {
      state.altContextMenu.isOpen = action.payload;
    })
    .addCase(setContextMenuCoords, (state, action) => {
      state.altContextMenu.coords = action.payload;
    })
    .addCase(setContextMenuType, (state, action) => {
      state.altContextMenu.menuType = action.payload;
    });
});

export {reducer};
