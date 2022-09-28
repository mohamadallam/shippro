import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import Pages from "../../routes/Pages";
import { logout, login } from "../../redux/reducers/auth";
import { Link } from "react-router-dom";
const Header = () => {
    const dispatch = useDispatch();
    const { user, role } = useAuth();

    const signOut = () => {
        dispatch(logout());
    };
    const SignIn = () => {
        dispatch(
            login({
                email: "mohamadadeeballam0@gmail.com",
                password: "00000000",
            })
        );
    };
    return (
        <header style={{ display: "block" }}>
            <ul>
                {Pages(role)
                    .filter((p) => p?.name)
                    .map((page, index) => {
                        return (
                            <li key={index}>
                                {" "}
                                <Link to={page.path}>{page.name}</Link>{" "}
                            </li>
                        );
                    })}
            </ul>

            {user && <button onClick={signOut}>logout</button>}
            {!user && <button onClick={SignIn}>login</button>}
        </header>
    );
};

export default Header;
