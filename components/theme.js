import { createTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#c14c2c',
    },
    secondary: {
      main: '#ffa259',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#222',
    },
  },
});

export default theme;