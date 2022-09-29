import React from "react";
import Statistics from "../../components/Dashboard/Statistics/Index";
import { Grid, Paper } from "@mui/material";
import { useSelector } from "react-redux";

const mapState = (state) => {
    return {
        shipmentCount: state.auth?.user?.shipmentCount,
    };
};
export default function Dashboard() {
    const { shipmentCount } = useSelector(mapState);
    return (
        <Grid container spacing={3}>
            {/* Shipments */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        minHeight: 150,
                    }}
                >
                    <Statistics
                        title="Shipments"
                        subttile={shipmentCount || 0}
                        path={"/shipments"}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}
