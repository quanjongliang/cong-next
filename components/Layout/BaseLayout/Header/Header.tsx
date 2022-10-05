import { Grid, useTheme } from "@mui/material";
import useAuth from "hooks/useAuth";
import { drawerWidth } from "themes/variables/constants";
import Auth from "./Auth.tsx/Auth";
import Logo from "./Logo";
import MenuHeader from "./MenuHeader";
import SearchHeader from "./SearchHeader";
interface IData {
  openDrawer: boolean;
}
export default function Header({ openDrawer }: IData) {
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
          zIndex: 999,
          width: `calc(100% - ${
            openDrawer ? `${drawerWidth}px` : `calc(${theme.spacing(8)} + 20px)`
          })`,
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
    </Grid>
  );
}
