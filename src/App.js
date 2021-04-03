import React from "react";
import Routes from "./Routes";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import brown from "@material-ui/core/colors/brown";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import ShowMessage from "./components/ShowMessage";
import Bus from "./services/Bus";

window.flash = message => Bus.emit('flash', message);

const theme = createMuiTheme({
  palette: {
    primary: brown,
    secondary: {
      main: "#fff",
    },
    success: green,
    error: red,
  },
  status: {
    danger: "orange",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ShowMessage />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
