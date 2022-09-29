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
        zIndex: 1350, // show between model and snackbar
    },
});

export default function LoadingPage({
    useLoading = null,
    backgroundColor = "rgba(0,0,0,0.12)",
}) {
    const classes = useStyles();
    let show = true;
    if (typeof useLoading === "function") {
        show = useLoading();
    }
    return (
        show && (
            <div className={classes.root} styles={{ backgroundColor }}>
                <CircularProgress thickness={5} size={50} disableShrink />
            </div>
        )
    );
}
