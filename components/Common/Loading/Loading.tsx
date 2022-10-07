import { Grid } from "@mui/material";
import { MoonLoader } from "react-spinners";
import React, { CSSProperties, useState } from "react";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
interface IData {
  isLoading: boolean;
}
export default function Loading({ isLoading }: IData) {
  return (
    <Grid
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 99999,
        background: "#262626db",
        height: "100%",
        width: "100vw",
      }}
    >
      <MoonLoader
        color="rgb(54, 215, 183)"
        loading={isLoading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
      />
    </Grid>
  );
}
