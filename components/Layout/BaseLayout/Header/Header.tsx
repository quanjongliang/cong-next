import MenuIcon from "@mui/icons-material/Menu";
import { Grid, IconButton, useTheme } from "@mui/material";
import useAuth from "hooks/useAuth";
import { memo } from "react";
import Auth from "../../../Modules/Auth.tsx/Auth";
import Logo from "./Logo";
import MenuHeader from "./MenuHeader";
import SearchHeader from "./SearchHeader";
interface IData {
  openDrawer: boolean;
  handleVisibleDrawer: () => void;
}
function Header({ openDrawer, handleVisibleDrawer }: IData) {
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <Grid display="flex">
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="nowrap"
        sx={{
          background: theme.palette.primary.light,
          height: 70,
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: openDrawer ? 99 : 999,
        }}
      >
        <Grid display="flex" alignItems="center">
          <IconButton
            onClick={handleVisibleDrawer}
            sx={{
              ml: 0.5,
              color: "white",
            }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Logo />
        </Grid>
        <Grid>
          <SearchHeader />
        </Grid>
        <Grid>{user ? <MenuHeader user={user} /> : <Auth />}</Grid>
      </Grid>
    </Grid>
  );
}

export default memo(Header);
