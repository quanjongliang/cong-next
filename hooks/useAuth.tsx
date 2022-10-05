import React, { useEffect } from "react";
import { useDispatch, useSelector } from "store";
import { getUserInfo } from "store/slices/auth/auth-api";

export default function useAuth() {
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user && accessToken) {
      dispatch(getUserInfo());
    }
  }, [dispatch, user, accessToken]);

  return {
    user,
    accessToken,
  };
}
