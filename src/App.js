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
};

function App() {
  const { user } = useAuth0();
  return (
    <ThemeProvider theme={theme.dark}>
      <MainPage />
      {JSON.stringify(user, null, 2)}
      <LoginButton />
      <LogoutButton />
    </ThemeProvider>
  );
}

export default App;
