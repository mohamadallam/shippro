import { createSlice } from "@reduxjs/toolkit";
import { uuid } from "../../../utils";

export const initialState = {
    isDrawerOpened: false,
    site: { name: "Shippro" },
};

const settingSlice = createSlice({
    name: "Setting",
    initialState,
    reducers: {
        setOpenDrawer: (state, { payload }) => {
            state.isDrawerOpened = Boolean(payload);
        },
    },
});

export const { setOpenDrawer } = settingSlice.actions;

export default settingSlice.reducer;
