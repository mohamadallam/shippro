import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { isKeyExistInObject } from "../../../../utils";
export const initialForm = {
    customer_address: "",
    customer_name: "",
    customer_phone_number: "",
    waybill: "",
};
export default function Form({
    form = null,
    onChange = () => {},
    readOnly = false,
    errors = null,
}) {
    return (
        <Box component="form" sx={{ mt: 1 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="customer_name"
                        name="customer_name"
                        label="Customer Name"
                        fullWidth
                        autoComplete="given-name"
                        variant={readOnly ? "filled" : "outlined"}
                        defaultValue={
                            (form &&
                                form?.customer_name &&
                                form.customer_name) ||
                            ""
                        }
                        onChange={onChange}
                        InputProps={{
                            readOnly,
                        }}
                        error={
                            isKeyExistInObject(errors, "customer_name").isExist
                        }
                        helperText={
                            isKeyExistInObject(errors, "customer_name").value
                        }
                        multiline
                        maxRows={2}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="waybill"
                        name="waybill"
                        label="Waybill"
                        fullWidth
                        autoComplete="off"
                        variant={readOnly ? "filled" : "outlined"}
                        defaultValue={
                            (form && form?.waybill && form.waybill) || ""
                        }
                        onChange={onChange}
                        InputProps={{
                            readOnly,
                        }}
                        error={isKeyExistInObject(errors, "waybill").isExist}
                        helperText={isKeyExistInObject(errors, "waybill").value}
                        multiline
                        maxRows={2}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        id="customer_phone_number"
                        name="customer_phone_number"
                        label="Customer Phone Number"
                        required
                        fullWidth
                        autoComplete="off"
                        variant={readOnly ? "filled" : "outlined"}
                        defaultValue={
                            (form &&
                                form?.customer_phone_number &&
                                form.customer_phone_number) ||
                            ""
                        }
                        onChange={onChange}
                        InputProps={{
                            readOnly,
                        }}
                        error={
                            isKeyExistInObject(errors, "customer_phone_number")
                                .isExist
                        }
                        helperText={
                            isKeyExistInObject(errors, "customer_phone_number")
                                .value
                        }
                        multiline
                        maxRows={2}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="customer_address"
                        name="customer_address"
                        label="Customer Address"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant={readOnly ? "filled" : "outlined"}
                        defaultValue={
                            (form &&
                                form?.customer_address &&
                                form.customer_address) ||
                            ""
                        }
                        onChange={onChange}
                        InputProps={{
                            readOnly,
                        }}
                        error={
                            isKeyExistInObject(errors, "customer_address")
                                .isExist
                        }
                        helperText={
                            isKeyExistInObject(errors, "customer_address").value
                        }
                        multiline
                        maxRows={4}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
