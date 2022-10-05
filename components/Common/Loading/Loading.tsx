import { Grid } from "@mui/material";
import React from "react";
const cells = 4;
export default function Loading() {
  const renderLoadingItem = () => {
    return [...new Array(cells)].map((_, i) => {
      return [...new Array(cells)].map((_, j) => (
        <div className={`cell d-${i + j}`} key={`${i}+${j}`} />
      ));
    });
  };
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
        background: "#26262699",
        height: "100%",
        width: "100vw",
      }}
    >
      <div className="loading-spinner">
        <div className="spinner-item"></div>
        <div className="spinner-item"></div>
        <div className="spinner-item"></div>
      </div>
    </Grid>
  );
}
