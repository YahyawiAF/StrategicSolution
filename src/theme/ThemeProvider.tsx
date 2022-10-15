import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { themeCreator } from "./base";
import { StylesProvider } from "@mui/styles";
export enum Theme {
  Dark = "Dark",
  Light = "Light",
}

export type ThemeContextType = {
  theme: Theme;
  setThemeName: (Theme: Theme) => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: Theme.Dark,
  setThemeName: theme => console.warn("no theme provider", theme),
});
export const useTheme = () => React.useContext(ThemeContext);

interface Props {
  children: React.ReactNode;
}

const ThemeProviderWrapper: React.FC<Props> = ({ children }) => {
  const curThemeName = sessionStorage.getItem("appTheme") || "PureLightTheme";
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    sessionStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };
  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={{ theme: Theme.Dark, setThemeName }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
