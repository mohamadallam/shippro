import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../../../components/Copyright";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, setErrors } from "../../../redux/reducers/auth";
import { isKeyExistInObject } from "../../../utils";
import { useEffect } from "react";
const mapState = (state) => {
    return {
        ...state.auth,
    };
};

export default function SignUp() {
    const dispatch = useDispatch();
    const { errors } = useSelector(mapState);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
            name: formData.get("name"),
        };
        dispatch(register(data));
    };
    useEffect(() => {
        return () => {
            dispatch(setErrors(null));
        };
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={
                                    isKeyExistInObject(errors, "name").isExist
                                }
                                helperText={
                                    isKeyExistInObject(errors, "name").value
                                }
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={
                                    isKeyExistInObject(errors, "email").isExist
                                }
                                helperText={
                                    isKeyExistInObject(errors, "email").value
                                }
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={
                                    isKeyExistInObject(errors, "password")
                                        .isExist
                                }
                                helperText={
                                    isKeyExistInObject(errors, "password").value
                                }
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/login">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}
