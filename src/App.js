import { ThemeProvider } from "styled-components";

import MainPage from "./views/MainPage";

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
  return (
    <ThemeProvider theme={theme.dark}>
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
