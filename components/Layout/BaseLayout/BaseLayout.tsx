import { Grid } from "@mui/material";
import { ReactNode, useState } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Sidebar from "./Header/Sidebar";
interface IData {
  children?: ReactNode | ReactNode[];
}
export default function BaseLayout({ children }: IData) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleVisibleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  return (
    <Grid
      display="flex"
      sx={{
        height: "100%",
      }}
    >
      <Sidebar
        handleVisibleDrawer={handleVisibleDrawer}
        openDrawer={openDrawer}
      />
      <Grid
        sx={{
          width: "100%",
        }}
      >
        <Header openDrawer={openDrawer} />
        <Grid
          sx={{
            marginTop: `70px`,
            height: "100%",
            p: 2,
          }}
        >
          {children}
        </Grid>
        <Footer />
      </Grid>
    </Grid>
  );
}
