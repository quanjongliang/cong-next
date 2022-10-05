import { Grid, Typography, useTheme } from "@mui/material";
import { IconFaceId } from "@tabler/icons";
import FacebookIcon from "@mui/icons-material/Facebook";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import React from "react";
import Link from "next/link";

const contacts = [
  {
    label: "0936424619",
    icon: <PhoneAndroidIcon />,
    link: "tel:0936424619",
  },
  {
    label: "Công",
    icon: <FacebookIcon />,
    link: "https://www.facebook.com/congcuoi.v3",
  },
];
export default function Footer() {
  const theme = useTheme();
  return (
    <Grid
      sx={{
        background: theme.palette.primary.light,
        color: "white",
      }}
    >
      <Grid display="flex" justifyContent="center">
        {contacts.map((item, index) => (
          <Grid
            key={index}
            textAlign="center"
            p={1}
            sx={{
              cursor: "pointer",
            }}
          >
            <Link href={item.link}>
              <Grid display="flex" alignItems="center">
                {item.icon}
                <Typography ml={1}>{item.label}</Typography>
              </Grid>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
