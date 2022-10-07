import { Grid } from "@mui/material";
import DashboardLayout from "components/Layout/AdminLayout/DashboardLayout";
import CKEditor from "components/Modules/CKEditor";
import React from "react";

export default function Index() {
  return (
    <DashboardLayout>
      Điện thoại
      <Grid>
        <CKEditor />
      </Grid>
    </DashboardLayout>
  );
}
