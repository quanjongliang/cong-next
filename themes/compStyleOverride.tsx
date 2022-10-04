// project imports
import { Theme } from "@mui/material/styles";

export default function componentStyleOverrides(theme: Theme) {
  const mode = theme.palette.mode;
  const borderColor =
    mode === "dark" ? theme.palette.dark[800] : theme.palette.primary.light;

  return {
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: `1px solid ${borderColor}`,
          padding: 10,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: `1px solid ${borderColor}`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor,
          opacity: mode === "dark" ? 0.2 : 1,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    // MuiInputLabel: {
    //   styleOverrides: {
    //     outlined: {
    //       transform: "translate(14px, -6px) scale(0.75)",
    //       transformOrigin: "top left",
    //       padding: "0 2px",
    //       background: "#ffffff",
    //     },
    //   },
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: "5px",
        },
        containedPrimary: {
          color: "white",
          background: "#0077cc",
        },
        containedError: {
          color: "white",
          background: theme.palette.error.light,
        },
        containedSuccess: {
          color: "black",
          background: theme.palette.success.light,
        },
        containedWarning: {
          color: "black",
          background: theme.palette.warning.light,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: `15px`,
          mb: 0.5,
          alignItems: "flex-start",
        },
      },
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: "10px",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "1 rem",
          padding: 20,
          fontWeight: "bold",
          // "&.Mui-selected": {
          //   backgroundColor: theme.palette.primary.light,
          // },
        },
      },
    },
  };
}
