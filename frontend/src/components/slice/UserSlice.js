import { createSlice } from '@reduxjs/toolkit';
const getUser = () => {
    const user = localStorage.getItem('user');
    console.log("Raw user data from localStorage: ", user);
    if (!user) {
        return null;
    }
    try {
        console.log("Parsed user object: ", JSON.parse(user));
        return JSON.parse(user);
    } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
        return null;
    }
};
let initialState = {
    user: getUser(),
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.user = action.payload;
        },
        removeUser: (state, action) => {
            localStorage.removeItem('user');
            state.user = null;
        },
    },
});

export const { saveUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
