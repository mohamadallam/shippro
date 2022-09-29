import React from "react";
import Table from "../../components/Dashboard/Table";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
    FetchAllShipments,
    DeleteShipment,
    setAction,
    InsertShipment,
    ShowShipment,
    UpdateShipment,
} from "../../redux/reducers/shipment";
import { parseObjectKeysFromArray } from "../../utils";
import { useState } from "react";
import { useEffect } from "react";
import Modal from "../../components/Dashboard/Shipment/Modal";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
const mapState = (state) => {
    return {
        shipments: state.shipment.shipments,
        shipmentCount: state.shipment.shipmentCount,
    };
};
export default function Index() {
    const rowsPerPageOptions = [5, 10, 15];
    const dispatch = useDispatch();
    const { shipments, shipmentCount } = useSelector(mapState);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(rowsPerPageOptions[0]);
    useEffect(() => {
        dispatch(FetchAllShipments({ first: perPage, page: page + 1 }));
    }, [page, perPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = (row) => {
        if (!row) return;

        dispatch(DeleteShipment({ id: row?.id }));
    };
    const handleEdit = (row) => {
        if (!row) return;

        const action = {
            type: "EDIT",
            row,
        };
        dispatch(setAction(action));
    };
    const handleView = (row) => {
        if (!row) return;
        // Fetch Shipment From Backend
        // dispatch(ShowShipment(row));
        const action = {
            type: "VIEW",
            row,
        };
        dispatch(setAction(action));
    };
    const handleAdd = (row = null) => {
        const action = {
            type: "ADD",
            row,
        };
        dispatch(setAction(action));
    };
    const handleSubmit = ({ form, action }) => {
        switch (action?.type) {
            case "ADD":
                dispatch(InsertShipment(form));
                break;
            case "EDIT":
                dispatch(UpdateShipment(form));
                break;
            default:
                dispatch(setAction(null));
                break;
        }
    };
    const tableActionButtons = (row) => (
        <Stack direction="row" spacing={0.3}>
            <IconButton
                variant="outlined"
                color="error"
                onClick={() => handleDelete(row)}
            >
                <DeleteIcon />
            </IconButton>
            <IconButton
                variant="contained"
                color="primary"
                onClick={() => handleEdit(row)}
            >
                <EditIcon />
            </IconButton>
            <IconButton
                variant="contained"
                color="warning"
                onClick={() => handleView(row)}
            >
                <RemoveRedEyeIcon />
            </IconButton>
        </Stack>
    );
    const tableHeadActionButtons = () => (
        <Stack direction="row" spacing={0.3}>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => handleAdd()}
                startIcon={<AddBoxIcon />}
            >
                Add Shipment
            </Button>
        </Stack>
    );
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper
                    sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Table
                        rows={shipments || []}
                        title={"Shipments"}
                        columns={parseObjectKeysFromArray(
                            shipments || [],
                            "filterKeysName"
                        )}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        count={shipmentCount || shipments?.length || 0}
                        rowsPerPage={perPage}
                        page={page}
                        rowsPerPageOptions={rowsPerPageOptions}
                        actions={tableActionButtons}
                        headActions={tableHeadActionButtons}
                    />
                </Paper>
            </Grid>

            <Modal onSubmit={handleSubmit} />
        </Grid>
    );
}
