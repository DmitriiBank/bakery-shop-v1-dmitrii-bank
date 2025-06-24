// authSlice.ts
import {createSlice} from "@reduxjs/toolkit";

type AuthState = {
    authUser: string;
    displayName: string;
}

const initialState: AuthState = {
    authUser: "",
    displayName: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginAction: (state, action) => {
            state.authUser = action.payload.email;
            state.displayName = action.payload.displayName;
        },
        logoutAction: (state) => {
            state.authUser = "";
            state.displayName = "";
        }
    }
})

export const {loginAction, logoutAction} = authSlice.actions;
export const authReducer = authSlice.reducer;