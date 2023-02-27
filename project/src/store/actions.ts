import { createAction } from '@reduxjs/toolkit';
import { UserType } from '../types/User';

export const setUser = createAction<UserType>('setUser');
