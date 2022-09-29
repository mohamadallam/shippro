import * as React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Title from "../Title";

export default function Statistics({ title = "", subttile = "", path = null }) {
    return (
        <React.Fragment>
            <Title>{title}</Title>
            <Typography component="p" variant="h4">
                {subttile}
            </Typography>

            {path && <Link to={path}>View more</Link>}
        </React.Fragment>
    );
}
