import Color from 'color';
import { createMuiTheme } from '@material-ui/core/styles';

const lightGreen = '#a0cc3f';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: Color(lightGreen).hex(),
      light: Color(lightGreen)
        .lighten(0.1)
        .hex(),
      dark: Color(lightGreen)
        .darken(0.1)
        .hex(),
      contrastText: '#f4f4f4',
    },
    secondary: {
      main: Color('#0953a0').hex(),
      light: Color('#0953a0')
        .lighten(0.5)
        .hex(),
      dark: Color('#0953a0')
        .darken(0.5)
        .hex(),
      contrastText: '#f4f4f4',
    },
  },
});
