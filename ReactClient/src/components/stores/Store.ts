import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './TokenSlice'
import userSlice from './UserSlice'
import collageSlice from './CollageSlice'

const Store = configureStore({
  reducer: {
    user: userSlice,
    token:tokenSlice,
    collages:collageSlice
     // הכנסנו את ה-reducer של ה-auth כאן
  },
});

export type RootState = ReturnType<typeof Store.getState>; // הגדרת טיפוס RootState
export type AppDispatch = typeof Store.dispatch;
export default Store;