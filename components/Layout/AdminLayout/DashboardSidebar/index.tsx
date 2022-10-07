import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { IconTag, IconBrandInertia, IconDeviceMobile } from "@tabler/icons";
import { ROUTE } from "model/route";
import Link from "next/link";
import React from "react";

const menuItems = [
  {
    label: "Banner",
    link: ROUTE.DASHBOARD_BANNER,
    icon: <IconBrandInertia />,
  },
  {
    label: "Danh mục",
    link: ROUTE.DASHBOARD_TAG,
    icon: <IconTag />,
  },
  {
    label: "Điện thoại",
    link: ROUTE.DASHBOARD_MOBILE,
    icon: <IconDeviceMobile />,
  },
];

interface IData {
  isOpenSidebar: boolean;
  handleVisibleSidebar: () => void;
}

export default function DashboardSidebar({
  handleVisibleSidebar,
  isOpenSidebar,
}: IData) {
  const list = () => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={handleVisibleSidebar}
      onKeyDown={handleVisibleSidebar}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <Link href={item.link}>
              <a>
                <ListItemButton
                  sx={{
                    pt: 2,
                    pb: 2,
                    pl: 4,
                    pr: 4,
                  }}
                >
                  {item.icon}
                  <ListItemText
                    primary={item.label}
                    sx={{
                      ml: 2,
                    }}
                  />
                </ListItemButton>
              </a>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor="left"
          open={isOpenSidebar}
          onClose={handleVisibleSidebar}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
