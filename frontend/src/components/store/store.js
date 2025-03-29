
import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authApi'
import emailReducer from '../features/emailApi'
import userReducer from '../slice/UserSlice'
import adminReducer from '../features/adminApi'

export const store = configureStore({
    reducer : {
        user : userReducer,
        [authReducer.reducerPath]:authReducer.reducer,
        [emailReducer.reducerPath]:emailReducer.reducer,
        [adminReducer.reducerPath]:adminReducer.reducer          
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(authReducer.middleware, emailReducer.middleware, adminReducer.middleware)
})

