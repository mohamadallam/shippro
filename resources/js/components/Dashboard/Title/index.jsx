import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

function Title(props) {
    return (
        <Typography
            component={props?.component || "h2"}
            sx={props?.sx || {}}
            variant="h6"
            color="primary"
            gutterBottom
            align="left"
        >
            {props.children}
        </Typography>
    );
}

Title.propTypes = {
    children: PropTypes.node,
};

export default Title;
