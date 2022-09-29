import store from "../redux/store";
import { logout } from "../redux/reducers/auth";
import { Roles } from "../services/authService";

const AppBar = ({ role, user }) => {
    const handleLogout = () => {
        store.dispatch(logout());
    };
    switch (role) {
        case Roles.USER:
            return [
                {
                    path: null,
                    name: user.name,
                    id: "profile-menu",
                    Icon: null,
                    onclick: null,
                    children: [
                        {
                            name: "Logout",
                            Icon: null,
                            id: "logout",
                            onclick: handleLogout,
                            path: null,
                        },
                    ],
                },
            ];

        default:
            return [
                {
                    path: "/login",
                    name: "SignIn",
                    Icon: null,
                    id: "login",
                    onclick: null,
                },
            ];
    }
};
export default AppBar;
