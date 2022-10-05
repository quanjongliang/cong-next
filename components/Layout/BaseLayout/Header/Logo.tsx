import { Button, Grid, Typography } from "@mui/material";
import Router from "next/router";
import React from "react";

export default function Logo() {
  return (
    <Grid>
      <Button onClick={() => Router.push("/")}>
        <Typography variant="h3" color="white">
          Cong Phone
        </Typography>
      </Button>
    </Grid>
  );
}
