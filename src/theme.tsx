import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#9ccc65"
    },
    secondary: {
      main: "#ff5252"
    },
    background: {
      default: "#212121"
    }
  }
});

export { theme };
