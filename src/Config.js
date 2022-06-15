import { createTheme } from "@mui/material/styles";

// Get bearer token
let csrftoken = "UQjFun51LZr6lm2STsTdJArIWyeoBkeckqgfTpMR";

// base url
let baseURL = "http://127.0.0.1:8000/api/";

// application theme
let theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  text: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#2c387e",
      darker: "#2c387e",
    },
    black: {
      main: "#11101D",
      darker: "#000000",
    },
    success: {
      main: "#2e7d32",
      darker: "#1b5e20",
    },
    danger: {
      main: "#e91e63",
      darker: "#a31545",
    },
    whitelite: {
      main: "#E4E9F7",
      darker: "#E4E9F7",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

export { csrftoken, baseURL, theme };
