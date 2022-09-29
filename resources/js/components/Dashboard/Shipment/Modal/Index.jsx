import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Form, { initialForm } from "../Form";
import { useState } from "react";
import { Button, Stack } from "@mui/material";
import { setAction } from "../../../../redux/reducers/shipment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Title from "../../Title";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
const mapState = (state) => {
    return {
        action: state.shipment.action,
        errors: state.shipment.errors,
    };
};

export default function ShipmentModal({ onSubmit = () => {} }) {
    const dispatch = useDispatch();
    const { action, errors } = useSelector(mapState);
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (!action?.row) {
            setForm(initialForm);
        } else {
            setForm(action.row);
        }
    }, [action]);

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const onClose = () => {
        dispatch(setAction(null));
    };
    const getTitle = () => {
        let t = "";
        if (action?.type) {
            t += action.type;
        }
        t += " Shipment ";
        if (action?.row?.id) {
            t += "(id: " + action?.row?.id + ")";
        }
        return t;
    };
    return (
        <Modal
            open={Boolean(action)}
            onClose={onClose}
            aria-labelledby="shipment-modal-title"
            aria-describedby="shipment-modal-description"
        >
            <Box sx={{ ...style }}>
                <Title
                    component={"h4"}
                    sx={{
                        width: "100%",
                        my: 3,
                    }}
                >
                    {" "}
                    {getTitle()}
                </Title>

                <Form
                    onChange={onChange}
                    form={form}
                    readOnly={action?.type === "VIEW"}
                    errors={errors}
                />

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        width: "100%",
                        my: 3,
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    {action?.type !== "VIEW" && (
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => onSubmit({ form, action })}
                        >
                            Save
                        </Button>
                    )}
                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => onClose()}
                    >
                        Cancle
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}
