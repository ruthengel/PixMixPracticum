import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

export type User = {
    userId: string | null;
    name: string | null;
    role: string | null;
    email: string | null;
} // ייבוא טיפוס `User`

interface tokenState {
    token: string | null;
    user: User | null;
}

const decodeToken = (token: string): User => {
    try {
        const decoded: any = jwtDecode(token);
        return {
            userId: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null,
            name: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || null,
            email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || null,
            role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null
        };
    } catch (error) {
        console.error("Error decoding token:", error);
        return { userId: null, name: null, email: null, role: null };
    }
};

const initialState: tokenState = {
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('token') ? decodeToken(localStorage.getItem('token')!) : null,
};


const tokenSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
            const decodedUser = decodeToken(action.payload);
            state.user = decodedUser;
        },
        signOut: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
        },
    },
});

export const { setToken, signOut } = tokenSlice.actions;
export default tokenSlice.reducer;