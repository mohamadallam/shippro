import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";
import Box from "@mui/material/Box";
import { uuid, filterForbiddenKey, isString } from "../../../utils";

export default function CustomTable({
    rows = [],
    title = "Table",
    columns = [],
    handleChangePage = () => {},
    handleChangeRowsPerPage = () => {},
    rowsPerPageOptions = [],
    count = 0,
    rowsPerPage = 0,
    page = 0,
    actions = null,
    forbiddenColumns = ["__typename", "typename"],
    headActions = null,
}) {
    const generateColumns = (columns) => {
        const arr = actions ? [...columns, "Actions"] : columns;
        return arr.map((column) => {
            if (filterForbiddenKey(column, forbiddenColumns)) return;

            return <TableCell key={uuid()}>{column}</TableCell>;
        });
    };
    const formatText = (str, maxlength = 20) => {
        if (str.length > maxlength && isString(str)) {
            str = str.substring(0, maxlength) + "...";
        }
        return str;
    };
    const generateRows = (rows) => {
        return rows.map((row) => {
            const keys = Object.keys(row);
            let cells = keys.map((key) => {
                if (
                    filterForbiddenKey(key, forbiddenColumns) ||
                    forbiddenColumns.includes(key)
                )
                    return;

                return <TableCell key={key}>{formatText(row[key])}</TableCell>;
            });
            if (actions) {
                cells.push(
                    <TableCell key={"actions"}>{actions(row)}</TableCell>
                );
            }
            return <TableRow key={uuid()}>{cells}</TableRow>;
        });
    };
    return (
        <Box sx={{ width: "100%" }}>
            <Box
                component="span"
                sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Title>{title}</Title>
                {headActions()}
            </Box>

            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>{generateColumns(columns)}</TableRow>
                    </TableHead>
                    <TableBody>{generateRows(rows)}</TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{
                    ".MuiTablePagination-toolbar > *": {
                        height: "100%",
                        margin: "0 10px",
                        padding: 0,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                    },
                }}
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
}
