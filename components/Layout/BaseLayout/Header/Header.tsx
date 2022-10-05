import { Grid, useTheme } from "@mui/material";
import useAuth from "hooks/useAuth";
import Auth from "./Auth.tsx/Auth";
import Logo from "./Logo";
import MenuHeader from "./MenuHeader";
import SearchHeader from "./SearchHeader";

export default function Header() {
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        background: theme.palette.primary.light,
        height: 70,
        position: "fixed",
        top: 0,
        zIndex: 999,
      }}
    >
      <Grid>
        <Logo />
      </Grid>
      <Grid>
        <SearchHeader />
      </Grid>
      <Grid>{user ? <MenuHeader user={user} /> : <Auth />}</Grid>
    </Grid>
  );
}
