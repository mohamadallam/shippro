import { useTheme } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0,0,0,0.12)",
        zIndex: 1300,
    },
});

export default function LoadingPage() {
    const classes = useStyles();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div className={classes.root}>
            <CircularProgress
                thickness={5}
                size={isMobile ? 50 : 75}
                disableShrink
            />
        </div>
    );
}
