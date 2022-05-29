import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
      primary: {
        light: '#e4f6f9',
        main: '#0c4964',
        dark: '#102a3a',
        contrastText: '#fff',
      },
      secondary: {
        light: '#e0f5f2',
        main: '#acdbec',
        dark: '#133d54',
        contrastText: '#000',
      },
      third: {
          light: '#d6f1ff',
          dark: '#002d40',
          main: '#4e8197'
      },
      fourth: {
        light:'#3f5566',
        main: '#cad6e1',
        dark: '#3f5566'
      }
    },
  });

export default theme;