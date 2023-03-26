import { createReducer } from '@reduxjs/toolkit';
import { USER_INFO } from '../consts/constUserInfo';
import { UserType } from '../types/User';
import { setCurrentRoomChatId, setCurrentRoomId, setCurrentRoomIsPasswordPlateOpened, setCurrentRoomPassword, setUser } from './actions';

type InitialStateType = {
  user: UserType;
  currentRoomInfo: {
    id: string;
    chatId: string;
    isPasswordPlateOpened: boolean;
    password: string;
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
    });
});

export {reducer};
