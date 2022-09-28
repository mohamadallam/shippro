import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/auth";

export default function Home() {
    const dispatch = useDispatch();

    return <div>Home</div>;
}
