import { createSlice } from "@reduxjs/toolkit";
import { USER_KEY } from "model/auth";
import { UserInfoResponse } from "shared/business/user";
import { canHandleLocalStorage } from "utils/window.util";
import { getUserInfo } from "./auth-api";

export interface IAuthStateProps {
  accessToken?: string;
  user: UserInfoResponse | undefined;
}

const initialState: IAuthStateProps = {
  user: undefined,
  accessToken: canHandleLocalStorage() ?  localStorage.getItem(USER_KEY) || '' : "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut(state) {
      localStorage.removeItem(USER_KEY);
      state.accessToken = "";
      state.user = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        if(action?.payload?.data){
          state.user = action?.payload?.data ;
          }else{
            logOut()
          }
      })
  },
});

export default authSlice.reducer;

export const { logOut } = authSlice.actions;

