// material-ui
import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import { DefaultColor as colors } from "./variables/colors";

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

export const Palette = (navType: PaletteMode) =>
  createTheme({
    palette: {
      mode: navType,
      common: {
        black: colors.darkPaper,
      },
      primary: {
        light:
          navType === "dark" ? colors.darkPrimaryLight : colors.primaryLight,
        main: navType === "dark" ? colors.darkPrimaryMain : colors.primaryMain,
        dark: navType === "dark" ? colors.darkPrimaryDark : colors.primaryDark,
      },
      secondary: {
        light:
          navType === "dark"
            ? colors.darkSecondaryLight
            : colors.secondaryLight,
        main:
          navType === "dark" ? colors.darkSecondaryMain : colors.secondaryMain,
        dark:
          navType === "dark" ? colors.darkSecondaryDark : colors.secondaryDark,
      },
      error: {
        light: colors.errorLight,
        main: colors.errorMain,
        dark: colors.errorDark,
      },
      warning: {
        light: colors.warningLight,
        main: colors.warningMain,
        dark: colors.warningDark,
      },
      success: {
        light: colors.successLight,
        main: colors.successMain,
        dark: colors.successDark,
      },
      grey: {
        50: colors.grey50,
        100: colors.grey100,
        500: navType === "dark" ? colors.darkTextSecondary : colors.grey500,
        600: navType === "dark" ? colors.darkTextTitle : colors.grey900,
        700: navType === "dark" ? colors.darkTextPrimary : colors.grey700,
        900: navType === "dark" ? colors.darkTextPrimary : colors.grey900,
      },
      dark: {
        light: colors.darkTextPrimary,
        main: colors.darkLevel1,
        dark: colors.darkLevel2,
        800: colors.darkBackground,
        900: colors.darkPaper,
      },
      text: {
        primary: navType === "dark" ? colors.darkTextPrimary : colors.grey700,
        secondary:
          navType === "dark" ? colors.darkTextSecondary : colors.grey500,
        dark: navType === "dark" ? colors.darkTextPrimary : colors.grey900,
        hint: colors.grey100,
      },
      divider: navType === "dark" ? colors.darkTextPrimary : colors.grey200,
      background: {
        paper: navType === "dark" ? colors.darkLevel2 : colors.paper,
        default: navType === "dark" ? colors.darkPaper : colors.paper,
      },
    },
  });
