import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { setOpenDrawer } from "../../../redux/reducers/setting";
import useAuth from "../../../hooks/useAuth";
import Pages from "../../../routes/Pages";
import { useNavigate } from "react-router-dom";
const mapState = (state) => {
    return {
        isDrawerOpened: state.setting.isDrawerOpened,
    };
};
export default function index() {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { isDrawerOpened } = useSelector(mapState);
    const { role } = useAuth();
    const toggleDrawer = () => {
        dispatch(setOpenDrawer(!isDrawerOpened));
    };
    return (
        <Drawer variant="permanent" open={isDrawerOpened}>
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                {Pages(role).map(
                    ({ Icon, name, path, showInDrawer = false }, index) => {
                        if (!showInDrawer) {
                            return null;
                        }
                        return (
                            <ListItemButton
                                key={index}
                                onClick={() => {
                                    navigate(path);
                                }}
                            >
                                {Icon && (
                                    <ListItemIcon>
                                        <Icon />
                                    </ListItemIcon>
                                )}
                                <ListItemText primary={name} />
                            </ListItemButton>
                        );
                    }
                )}
            </List>
        </Drawer>
    );
}
const drawerWidth = 240;
const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));
