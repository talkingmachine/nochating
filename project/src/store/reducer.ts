import { createReducer } from '@reduxjs/toolkit';
import { USER_INFO } from '../consts/constUserInfo';
import { UserType } from '../types/User';
import { setUser } from './actions';

type InitialStateType = {
  user: UserType;
}
const initialState: InitialStateType = {
  user: USER_INFO,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});

export {reducer};
