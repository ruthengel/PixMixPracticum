import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './TokenSlice'
import userSlice from './UserSlice'
import collageSlice from './CollageSlice'

const Store = configureStore({
  reducer: {
    user: userSlice,
    token:tokenSlice,
    collages:collageSlice
     
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;