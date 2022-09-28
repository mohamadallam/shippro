import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./graphql";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ApolloProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
