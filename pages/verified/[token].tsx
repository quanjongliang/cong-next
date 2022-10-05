import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { AuthService } from "services/auth.service";
import { ConfirmUserDTO } from "shared/dto/confirm-user.dto";
import Container from "typedi";

const authService = Container.get(AuthService);

export default function Verified() {
  const router = useRouter();
  const { token = "" } = router.query;
  useEffect(() => {
    if (token) {
      authService
        .confirmUser(new ConfirmUserDTO({ token: token as string }))
        .then((res) => {
          console.log(res);
          setTimeout(() => {
            router.push("/");
          }, 3000);
        })
        .catch((err) => console.log(err));
    }
  });
  return <Grid>{token}</Grid>;
}
