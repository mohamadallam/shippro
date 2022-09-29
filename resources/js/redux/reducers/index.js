import authReducer, { initialState as authInitialState } from "./auth";
import notifyReducer, { initialState as notifyInitialState } from "./notify";
import shipmentReducer, {
    initialState as shipmentInitialState,
} from "./shipment";
import settingReducer, { initialState as settingInitialState } from "./setting";
export default {
    shipment: shipmentReducer,
    auth: authReducer,
    notify: notifyReducer,
    setting: settingReducer,
};
export const initialState = {
    auth: authInitialState,
    shipment: shipmentInitialState,
    notify: notifyInitialState,
    setting: settingInitialState,
};
