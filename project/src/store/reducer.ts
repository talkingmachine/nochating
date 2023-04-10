import { createReducer } from '@reduxjs/toolkit';
import { USER_INFO } from '../consts/constUserInfo';
import { ContextMenuInfo, NewRoomInfo, PasswordPlateInfo, WarningMessageInfo } from '../types/Popups';
import { UserType } from '../types/User';
import { setContextMenuInfo, setCurrentRoomChatId, setNewRoomInfo, setPasswordPlateInfo, setUser, setWarningMessageInfo } from './actions';

type InitialStateType = {
  user: UserType;
  currentRoomInfo: {
    chatId: string;
  };
  passwordPlateInfo: PasswordPlateInfo;
  newRoomInfo: NewRoomInfo;
  contextMenuInfo: ContextMenuInfo;
  warningMessageInfo: WarningMessageInfo;
}
const initialState: InitialStateType = {
  user: USER_INFO,
  currentRoomInfo: {
    chatId: '',
  },
  passwordPlateInfo: {
    password: '',
    chatId: '',
    isOpen: false,
  },
  newRoomInfo: {
    isOpen: false,
  },
  contextMenuInfo: {
    isOpen: false,
    contextMenuType: '',
    contextMenuCoords: {
      x: 0,
      y: 0,
    },
    roomId: '',
    messageId: '',
    chatId: '',
  },
  warningMessageInfo: {
    isOpen: false,
    title: '',
    description: '',
  }
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setCurrentRoomChatId, (state, action) => {
      state.currentRoomInfo.chatId = action.payload;
    })
    .addCase(setPasswordPlateInfo, (state, action) => {
      state.passwordPlateInfo = action.payload;
    })
    .addCase(setNewRoomInfo, (state, action) => {
      state.newRoomInfo = action.payload;
    })
    .addCase(setContextMenuInfo, (state, action) => {
      state.contextMenuInfo = action.payload;
    })
    .addCase(setWarningMessageInfo, (state, action) => {
      state.warningMessageInfo = action.payload;
    });
});

export {reducer};
