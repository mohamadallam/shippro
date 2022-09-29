import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import store from "../redux/store";

import {
    AuthError,
    ServerParseError,
    gqlErrors,
    handleNetworkError,
} from "../utils";
import { Logout } from "../redux/reducers/auth";

const httpLink = new HttpLink({
    uri: "http://127.0.0.1:8000/graphql",
    headers: {
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')
            .content,
    },
});

const errorLink = onError((err) => {
    console.log("appolo", err);
    try {
        if (err?.networkError) {
            handleNetworkError(err);
        }
        if (err?.graphQLErrors) {
            // check if there an authentication error
            gqlErrors(err);
        }
    } catch (err) {
        // catch authentication error
        if (err instanceof AuthError || err instanceof ServerParseError) {
            store.dispatch(Logout());
        }
    }
});
const appLink = from([errorLink, httpLink]);
export const apolloClient = new ApolloClient({
    link: appLink,
    cache: new InMemoryCache(),
});
