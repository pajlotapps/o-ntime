import { createTheme } from "@mui/material/styles";

const Colors = {
    primary: "#00adb5",
    secondary: "#95defb",

    white: "#ffffff",
    black: "#000000"
}

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      gradient: {
        main: "linear-gradient(-39deg, #263238 0%, #212121 100%)",
      },
      primary: {
        main: Colors.primary
      },
      secondary: {
        main: Colors.secondary
      },
    },
  });

  export default darkTheme;