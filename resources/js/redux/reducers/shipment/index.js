import { createSlice } from "@reduxjs/toolkit";
import { gqlErrors } from "../../../utils";
import { ShipmentService } from "../../../services";

export const initialState = {
    loading: false,
    shipments: [],
    shipment: null,
    errors: null,
    shipmentCount: 0,
    action: null,
};

const ShipmentsSlice = createSlice({
    name: "Shipments",
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.loading = payload;
            return state;
        },
        Insert: (state, { payload }) => {
            state.shipments.push(payload);
            state.errors = null;
            state.action = null;
            return state;
        },

        Show: (state, { payload }) => {
            state.shipment = payload;
            state.errors = null;
            state.action = null;
            return state;
        },

        Update: (state, { payload }) => {
            let ind = state.shipments.findIndex((el) => el.id === payload.id);
            if (ind !== -1) state.shipments[ind] = payload;

            state.errors = null;
            state.action = null;
            state.shipmentCount = state.shipments.length;
            return state;
        },
        Delete: (state, { payload }) => {
            let index = state.shipments.findIndex((el) => el.id === payload);
            if (index !== -1) state.shipments.splice(index, 1);

            state.errors = null;
            state.action = null;
            state.shipmentCount = state.shipments.length;
            return state;
        },
        Fetch: (state, { payload }) => {
            state.shipments = payload.shipments;
            state.shipmentCount = payload.shipmentCount;
            state.errors = null;
            return state;
        },
        setErrors: (state, { payload }) => {
            state.errors = payload;
            return state;
        },
        setAction: (state, { payload }) => {
            state.action = payload;
            return state;
        },
    },
});

export const {
    setLoading,
    Insert,
    Update,
    Delete,
    Fetch,
    Show,
    setErrors,
    setAction,
} = ShipmentsSlice.actions;

export const InsertShipment = (data) => async (dispatch) => {
    dispatch(setLoading(true));
    let s = null;
    try {
        const { success, shipment, errors } = await ShipmentService.insert(
            data
        );

        if (success && !errors) {
            dispatch(Insert(shipment));
            s = shipment;
        }
    } catch (err) {
    } finally {
        dispatch(setLoading(false));
    }
    return s;
};

export const ShowShipment =
    ({ id }) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let s = null;
        try {
            const { success, shipment, errors } = await ShipmentService.show({
                id,
            });
            if (success && !errors) {
                dispatch(Show(shipment));
                s = shipment;
            }
        } catch (err) {
        } finally {
            dispatch(setLoading(false));
        }
        return s;
    };

export const UpdateShipment = (data) => async (dispatch) => {
    dispatch(setLoading(true));
    let s = null;
    try {
        const { success, shipment, errors } = await ShipmentService.update(
            data
        );
        if (success && !errors) {
            dispatch(Update(shipment));
            s = shipment;
        }
    } catch (err) {
    } finally {
        dispatch(setLoading(false));
    }
    return s;
};

export const DeleteShipment =
    ({ id }) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let s = null;
        try {
            const { success, shipment, errors } = await ShipmentService.delete({
                id,
            });
            if (success && !errors) {
                dispatch(Delete(shipment.id));
                s = shipment;
            }
        } catch (err) {
        } finally {
            dispatch(setLoading(false));
        }
        return s;
    };

export const FetchAllShipments = (data) => async (dispatch) => {
    dispatch(setLoading(true));
    let d = null;
    try {
        const { success, shipments, shipmentCount, errors } =
            await ShipmentService.fetchAll(data);
        if (success && !errors) {
            dispatch(Fetch({ shipmentCount, shipments }));
            d = shipments;
        }
    } catch (err) {
    } finally {
        dispatch(setLoading(false));
    }
    return d;
};

export default ShipmentsSlice.reducer;
