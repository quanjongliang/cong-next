import {
  createTheme,
  Theme,
  ThemeOptions,
  ThemeProvider,
  CssBaseline,
  StyledEngineProvider,
} from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { ReactNode, useMemo } from "react";
import componentStyleOverrides from "./compStyleOverride";
import { Palette } from "./palette";
import { Typography } from "./typography";
import { ConfigTheme } from "model/layout";

interface Props {
  children: ReactNode;
}

export const ThemeCustomization = ({ children }: Props) => {
  const { fontFamily, borderRadius } = ConfigTheme;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const theme: Theme = useMemo<Theme>(() => Palette("light"), []);

  const themeTypography: TypographyOptions = useMemo<TypographyOptions>(
    () => Typography(theme, borderRadius, fontFamily),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: theme.palette,
      typography: themeTypography,
    }),
    [theme, themeTypography]
  );

  const themes: Theme = createTheme(themeOptions);
  themes.components = useMemo(() => componentStyleOverrides(themes), [themes]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
