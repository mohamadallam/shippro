import { blue, pink } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
export const theme = createTheme({
    palette: {
        primary: blue,
        secondary: pink,
    },
});
theme.shadows[24] = theme.shadows[4];
export default theme;
