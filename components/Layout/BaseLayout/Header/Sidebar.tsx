import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  CSSObject,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  Typography,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import {
  IconDeviceLaptop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconDotsCircleHorizontal,
} from "@tabler/icons";
import { ROUTE } from "model/route";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import { drawerWidth } from "themes/variables/constants";

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 20px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} +20px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
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

  return (
    <Drawer variant="permanent" open={openDrawer}>
      <DrawerHeader>
        <IconButton
          onClick={handleVisibleDrawer}
          sx={{
            m: openDrawer ? 0 : "auto",
          }}
        >
          {openDrawer ? (
            <ChevronLeftIcon fontSize="large" />
          ) : (
            <ChevronRightIcon fontSize="large" />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {sidebarItems.map(({ icon: IconSidebar, label, link }, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <Link href={link}>
              <a>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: openDrawer ? "initial" : "center",
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
                    primary={
                      <Typography
                        sx={{
                          fontSize: 20,
                        }}
                      >
                        {label}
                      </Typography>
                    }
                    sx={{ opacity: openDrawer ? 1 : 0 }}
                  />
                </ListItemButton>
              </a>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default memo(Sidebar);
