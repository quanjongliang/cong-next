import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginDTO } from "shared/dto/login.dto";
import { User } from "shared/business/user";



export const signIn = createAsyncThunk(
  "login",
  async (loginDTO: LoginDTO) => {
    return {
      access_token: JSON.stringify("abcxyz"),
      user: new User(),
    };
  }
);

