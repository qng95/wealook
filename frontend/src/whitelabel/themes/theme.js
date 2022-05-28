import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
      primary: {
        light: '#e4f6f9',
        main: '#0c4964',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#e0f5f2',
        main: '#acdbec',
        dark: '#ba000d',
        contrastText: '#000',
      },
      third: {
          light: '#d6f1ff',
          dark: '#002d40',
          main: '#4e8197'
      }
    },
  });

export default theme;