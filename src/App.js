import { useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { ThemeProvider } from "styled-components";

import MainPage from "./views/MainPage";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

const theme = {
  dark: {
    coal: "#1A1A1A",
    graphite: "#333333",
    steel: "#404040",
    neon: "#00FFC2",
    pale: "rgba(255, 255, 255, 0.8)",
    poppy: "#ff0000",
    white: "#ffffff",
    paleEmerald: "rgba(0, 255, 194, 0.38)",
    disabled: "rgba(255, 255, 255, 0.4)",
    error: "#ff1212",
  },
  light: {
    coal: "#d3d3d3",
    graphite: "#dedede",
    steel: "#f2f2f2",
    neon: "#ff5200",
    pale: "rgba(0,0,0, 0.8)",
    poppy: "#ff0000",
    white: "#000",
    paleEmerald: "rgba(255, 82, 0, 0.38)",
    disabled: "rgba(255, 255, 255, 0.4)",
    error: "#ff1212",
  },
};

function App() {
  const [currTheme, setCurrTheme] = useState("light");
  const { user } = useAuth0();

  const toggleTheme = useCallback(() => {
    setCurrTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeProvider theme={theme[currTheme]}>
      <MainPage toggleTheme={toggleTheme} currTheme={currTheme} />
    </ThemeProvider>
  );
}

export default App;
