import { createSlice } from "@reduxjs/toolkit";
import { gqlErrors } from "../../../utils";
import { ShipmentService } from "../../../services";

export const initialState = {
    loading: false,
    shipments: [],
    shipment: null,
    errors: null,
};

const ShipmentsSlice = createSlice({
    name: "Shipments",
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.loading = payload;
            state.errors = null;
        },
        Insert: ({ shipments, errors }, { payload }) => {
            shipments.push(payload);
            errors = null;
        },

        Show: (state, { payload }) => {
            state.shipment = payload;
            state.errors = null;
        },

        Update: (state, { payload }) => {
            let ind = state.shipments.findIndex((el) => el.id === payload.id);
            if (ind !== -1) state.shipments[ind] = payload;

            state.errors = null;
        },
        Delete: ({ shipments, errors }, { payload }) => {
            let index = shipments.findIndex((el) => el.id === payload);
            if (index !== -1) shipments.splice(index, 1);

            errors = null;
        },
        Fetch: (state, { payload }) => {
            state.shipments = payload;
            state.errors = null;
        },
        setErrors: (state, { payload }) => {
            state.errors = payload;
        },
    },
});

const { setLoading, Insert, Update, Delete, Fetch, Show, setErrors } =
    ShipmentsSlice.actions;

export const InsertShipment = (data) => async (dispatch) => {
    dispatch(setLoading(true));
    // Toast({ message: result.message, type: 'success' });
    try {
        const { success, shipment, errors } = await ShipmentService.insert(
            data
        );
        if (!success || errors) {
            dispatch(setErrors(gqlErrors(err)));
            return;
        }
        dispatch(Insert(shipment));
        return shipment;
    } catch (err) {
    } finally {
        dispatch(setLoading(false));
    }
};

export const ShowShipment =
    ({ id }) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        // Toast({ message: result.message, type: 'success' });
        try {
            const { success, shipment, errors } = await ShipmentService.show({
                id,
            });
            if (!success || errors) {
                dispatch(setErrors(gqlErrors(err)));
                return;
            }
            dispatch(Show(shipment));
            return shipment;
        } catch (err) {
        } finally {
            dispatch(setLoading(false));
        }
    };

export const UpdateShipment = (data) => async (dispatch) => {
    dispatch(setLoading(true));
    // Toast({ message: result.message, type: 'success' });
    try {
        const { success, shipment, errors } = await ShipmentService.update(
            data
        );
        if (!success || errors) {
            dispatch(setErrors(gqlErrors(err)));
            return;
        }
        dispatch(Update(shipment));
        return shipment;
    } catch (err) {
    } finally {
        dispatch(setLoading(false));
    }
};

export const DeleteShipment =
    ({ id }) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        // Toast({ message: result.message, type: 'success' });
        try {
            const { success, shipment, errors } = await ShipmentService.delete({
                id,
            });
            if (!success || errors) {
                dispatch(setErrors(gqlErrors(err)));
                return;
            }
            dispatch(Delete(shipment.id));
            return shipment;
        } catch (err) {
        } finally {
            dispatch(setLoading(false));
        }
    };

export const FetchAllShipments = (data) => async (dispatch) => {
    dispatch(setLoading(true));
    // Toast({ message: result.message, type: 'success' });
    try {
        const { success, shipments, errors } = await ShipmentService.fetchAll(
            data
        );
        if (!success || errors) {
            dispatch(setErrors(gqlErrors(err)));
            return;
        }
        dispatch(Fetch(shipments));
        return shipments;
    } catch (err) {
    } finally {
        dispatch(setLoading(false));
    }
};

export default ShipmentsSlice.reducer;
