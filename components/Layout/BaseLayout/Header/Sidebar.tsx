import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import {
  IconDeviceLaptop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconDotsCircleHorizontal,
  IconDashboard,
} from "@tabler/icons";
import { ROUTE } from "model/route";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import { USER_ROLE } from "shared/business/user";
import { useSelector } from "store";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface IData {
  openDrawer: boolean;
  handleVisibleDrawer: () => void;
}

const sidebarItems = [
  {
    label: "IPorn",
    link: ROUTE.MOBILE,
    icon: IconDeviceMobile,
  },
  {
    label: "Mac bok",
    link: ROUTE.LAPTOP,
    icon: IconDeviceLaptop,
  },
  {
    label: "Tap let",
    link: ROUTE.TABLET,
    icon: IconDeviceTablet,
  },
  {
    label: "Pk",
    link: ROUTE.OTHER,
    icon: IconDotsCircleHorizontal,
  },
];

function Sidebar({ openDrawer, handleVisibleDrawer }: IData) {
  const { pathname } = useRouter();
  const { user } = useSelector((state) => state.auth);
  return (
    <SwipeableDrawer
      anchor="left"
      open={openDrawer}
      onClose={handleVisibleDrawer}
      onOpen={handleVisibleDrawer}
    >
      <DrawerHeader>
        {user?.role === USER_ROLE.ADMIN && (
          <Grid>
            <Link href="dashboard">
              <a>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    pl: 0,
                    pr: 10,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      justifyContent: "center",
                      fontSize: 20,
                    }}
                  >
                    <IconDashboard size={30} stroke={2.5} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="h4">Dashboard</Typography>}
                    sx={{ opacity: openDrawer ? 1 : 0 }}
                  />
                </ListItemButton>
              </a>
            </Link>
          </Grid>
        )}
        <IconButton onClick={handleVisibleDrawer}>
          <ChevronLeftIcon fontSize="large" />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {sidebarItems.map(({ icon: IconSidebar, label, link }, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{ display: "block", textAlign: "left" }}
          >
            <Link href={link}>
              <a>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    pl: 0,
                    pr: 10,
                  }}
                  selected={pathname.includes(link)}
                >
                  <ListItemIcon
                    sx={{
                      justifyContent: "center",
                      fontSize: 20,
                    }}
                  >
                    <IconSidebar size={30} stroke={2.5} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="h4">{label}</Typography>}
                    sx={{ opacity: openDrawer ? 1 : 0 }}
                  />
                </ListItemButton>
              </a>
            </Link>
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );
}

export default memo(Sidebar);
