import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  components: {
    MuiInputLabel:{
      styleOverrides: {
        root: {
          "&.MuiFormLabel-root": {
            color: "#DDDDDD",
          },
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {

          "&.MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "#7f85f5",
            },
          },
        },
      },
    },
  },
  palette: {
    background: {
      default: "#141414",
      paper: "#1f1f1f",
    },
    text: {
      primary: "#ffffff",
      disabled: "#eeeeee",
    },
    primary: {
      main: "#7f85f5",
    },
    secondary: {
      main: "#a6a5a5",
    },
    error: {
      main: "#d74654",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
