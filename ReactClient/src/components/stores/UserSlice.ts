// stores/UserSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  userId: string | null;
  name: string | null;
  email: string | null;
  role: string | null;
}

const initialState: User = {
  userId: '',
  name: '',
  email: '',
  role: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setUser: (state, action: PayloadAction<User>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.role = action.payload.role
    },

    clearUser: (state) => {
      state.name = '';
      state.email = '';
      state.role = '';
      state.userId = ''
    },
  },
});


export const { setUser, clearUser } = userSlice.actions;


export default userSlice.reducer;