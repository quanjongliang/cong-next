import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "services/auth.service";
import Container from "typedi";

const authService = Container.get(AuthService)

export const getUserInfo = createAsyncThunk(
  "getUserInfo",
  async () => {
   return authService.getUserInfo()
  }
);

