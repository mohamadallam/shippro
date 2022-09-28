import { useTheme } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
    //     mobile stepper: 1000
    // fab: 1050
    // speed dial: 1050
    // app bar: 1100
    // drawer: 1200
    // modal: 1300
    // snackbar: 1400
    // tooltip: 1500
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
