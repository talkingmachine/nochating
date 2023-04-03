import { createReducer } from '@reduxjs/toolkit';
import { USER_INFO } from '../consts/constUserInfo';
import { UserType } from '../types/User';
import { setCurrentRoomChatId, setCurrentRoomId, setUser } from './actions';

type InitialStateType = {
  user: UserType;
  currentRoomInfo: {
    id: string;
    chatId: string;
  };
}
const initialState: InitialStateType = {
  user: USER_INFO,
  currentRoomInfo: {
    id: '',
    chatId: '123',
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
    });
});

export {reducer};
