import { Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import Auth from "./Auth.tsx/Auth";
import Logo from "./Logo";
import SearchHeader from "./SearchHeader";

export default function Header() {
  const theme = useTheme();
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        background: theme.palette.primary.light,
        // position: "fixed",
        // top: 0,
      }}
      p={1}
    >
      <Grid>
        <Logo />
      </Grid>
      <Grid>
        <SearchHeader />
      </Grid>
      <Grid>
        <Auth />
      </Grid>
    </Grid>
  );
}
