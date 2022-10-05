import { Grid } from "@mui/material";
import useAuth from "hooks/useAuth";
import { ROUTE } from "model/route";
import Router from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { USER_ROLE } from "shared/business/user";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
interface IData {
  children?: ReactNode | ReactNode[];
}
export default function DashboardLayout({ children }: IData) {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const handleVisibleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };
  const { user, accessToken } = useAuth();
  useEffect(() => {
    if (accessToken && user && user?.role !== USER_ROLE.ADMIN) {
      Router.push(ROUTE.FORBIDDEN);
    }
  }, [accessToken, user]);
  if (!user || user.role !== USER_ROLE.ADMIN) {
    return <Grid />;
  }
  return (
    <Grid>
      <DashboardHeader
        handleVisibleSidebar={handleVisibleSidebar}
        user={user}
      />
      <DashboardSidebar
        isOpenSidebar={isOpenSidebar}
        handleVisibleSidebar={handleVisibleSidebar}
      />
      <Grid p={2}>{children}</Grid>
    </Grid>
  );
}
