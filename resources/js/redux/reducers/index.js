import authReducer, { initialState as authInitialState } from "./auth";
import notifyReducer, { initialState as notifyInitialState } from "./notify";
import shipmentReducer, {
    initialState as shipmentInitialState,
} from "./shipment";
export default {
    shipment: shipmentReducer,
    auth: authReducer,
    notify: notifyReducer,
};
export const initialState = {
    auth: authInitialState,
    shipment: shipmentInitialState,
    notify: notifyInitialState,
};
