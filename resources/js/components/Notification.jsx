import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uuid } from "../utils";
import { Close } from "../redux/reducers/notify";
const mapState = (state) => ({
    snackbar: state.notify.snackbar,
});

export default function Notification() {
    const dispatch = useDispatch();
    const { snackbar } = useSelector(mapState);
    const key = snackbar?.key || uuid();
    const { enqueueSnackbar } = useSnackbar();
    function onExited(key) {
        dispatch(Close(key));
    }
    useEffect(() => {
        if (snackbar && snackbar?.message) {
            let variant = "info";
            if (snackbar.variant) {
                variant = snackbar.variant;
            }
            enqueueSnackbar(snackbar.message, {
                variant: variant,
                autoHideDuration: 5000,
                key,
                onExited: () => onExited(key),
            });
        }
    }, [snackbar]);
    return <></>;
}
