import { Roles } from "../services/authService";

// Icons
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DashboardIcon from "@mui/icons-material/Dashboard";
const Drawer = (Role) => {
    switch (Role) {
        case Roles.USER:
            return [
                {
                    path: "/",
                    name: "Dashboard",
                    Icon: DashboardIcon,
                },
                {
                    path: "/shipments",
                    name: "Shipments",
                    Icon: LocalShippingIcon,
                },
            ];

        default:
            return [];
    }
};
export default Drawer;
