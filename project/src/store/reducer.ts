import { createReducer } from '@reduxjs/toolkit';
import { USER_INFO } from '../consts/constUserInfo';
import { UserType } from '../types/User';
import { setCurrentChatId, setUser } from './actions';

type InitialStateType = {
  user: UserType;
  currentChatId: string;
}
const initialState: InitialStateType = {
  user: USER_INFO,
  currentChatId: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setCurrentChatId, (state, action) => {
      state.currentChatId = action.payload;
    });
});

export {reducer};
