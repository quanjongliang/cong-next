import { Grid } from "@mui/material";
import { ReactNode } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
interface IData {
  children?: ReactNode | ReactNode[];
}
export default function BaseLayout({ children }: IData) {
  return (
    <>
      <Header />
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
    </>
  );
}
