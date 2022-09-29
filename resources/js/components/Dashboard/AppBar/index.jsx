import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuItem, Menu, Box, Button, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpenDrawer } from "../../../redux/reducers/setting";
import AppBarLinks from "../../../routes/AppBar";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
const mapState = (state) => {
    return {
        isDrawerOpened: state.setting.isDrawerOpened,
        siteName: state.setting.site.name,
    };
};
export default function index() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useAuth();
    const { isDrawerOpened } = useSelector(mapState);
    const toggleDrawer = () => {
        dispatch(setOpenDrawer(!isDrawerOpened));
    };
    const [menus, setMenus] = useState({});
    const handleOpenMenu = (event, key) => {
        let openedMenu = { ...menus };
        openedMenu[key] = event.currentTarget;
        setMenus(openedMenu);
    };
    const handleCloseMenu = (key) => {
        if (!Boolean(menus[key])) {
            return;
        }
        let openedMenu = { ...menus };
        delete openedMenu[key];
        setMenus(openedMenu);
    };

    const handleNavLinkClick = (e, link, key) => {
        e.preventDefault();
        if (link?.onclick) {
            link.onclick();
        } else if (link?.path) {
            navigate(link?.path);
        }
        handleCloseMenu(key);
    };

    return (
        <AppBar position="absolute" open={isDrawerOpened}>
            <Toolbar
                sx={{
                    pr: "24px", // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: "36px",
                        ...(isDrawerOpened && { display: "none" }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Dashboard
                </Typography>

                <Box sx={{ flexGrow: 0 }}>
                    {AppBarLinks(auth).map((link, index) => {
                        let key = link?.id || index;
                        if (!link?.children) {
                            return (
                                <Button
                                    key={key}
                                    onClick={(e) =>
                                        handleNavLinkClick(e, link, key)
                                    }
                                    sx={{
                                        my: 2,
                                    }}
                                >
                                    {link?.name}
                                </Button>
                            );
                        }
                        if (link?.children) {
                            return (
                                <Box sx={{ flexGrow: 0 }} key={key}>
                                    <Tooltip title={link?.name}>
                                        <Button
                                            onClick={(e) =>
                                                handleOpenMenu(e, key)
                                            }
                                            sx={{
                                                cursor: "pointer",
                                                color: "#fff",
                                            }}
                                        >
                                            {link?.name}
                                        </Button>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: "45px" }}
                                        anchorEl={menus[key] || null}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(menus[key])}
                                        onClose={() => handleCloseMenu(key)}
                                    >
                                        {link.children.map((childLink, i) => {
                                            return (
                                                <MenuItem
                                                    key={i}
                                                    onClick={(e) =>
                                                        handleNavLinkClick(
                                                            e,
                                                            childLink,
                                                            i
                                                        )
                                                    }
                                                >
                                                    {childLink?.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Menu>
                                </Box>
                            );
                        }
                    })}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
