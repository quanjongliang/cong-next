import { Grid } from "@mui/material";
import BaseLayout from "components/Layout/BaseLayout/BaseLayout";
import ItemBox from "components/Modules/ItemBox";
import React from "react";

export default function Mobile() {
  return (
    <BaseLayout>
      Mobile asdasdas
      <Grid display="flex" justifyContent="space-around">
        <Grid>
          {" "}
          <ItemBox />
        </Grid>
        <Grid>
          {" "}
          <ItemBox />
        </Grid>
      </Grid>
    </BaseLayout>
  );
}
