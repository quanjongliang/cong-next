import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "shared/business/user";
import { USER_ACCESS_TOKEN } from "model/auth";
import { signIn } from "./auth-api";



export interface IAuthStateProps {
  access_token: string;
  user?: User;
}

const initialState: IAuthStateProps = {
  user: undefined,
  access_token: localStorage.getItem(USER_ACCESS_TOKEN) || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{access_token: string, user: User}>) {

    },
    logOut(state) {
      localStorage.removeItem(USER_ACCESS_TOKEN);
      state.access_token = "";
      state.user = undefined;
    },
    getCurrentUser(state) {
      state.user = JSON.parse(state.access_token);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        const { access_token, user } = action.payload;
        state.access_token = access_token;
        localStorage.setItem(USER_ACCESS_TOKEN, access_token);
        state.user = user;
      })
  },
});

export default authSlice.reducer;

export const { logOut, getCurrentUser } = authSlice.actions;
