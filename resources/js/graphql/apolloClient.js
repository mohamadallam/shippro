import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import store from "../redux/store";
import { Push } from "../redux/reducers/notify";
import { AuthError, gqlErrors } from "../utils";
import { logout } from "../redux/reducers/auth";
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
            if (typeof window !== "undefined" && !window.navigator.onLine) {
                store.dispatch(Push({ message: "Your browser is offline." }));
            } else {
                store.dispatch(
                    Push({
                        message: "Network error occurred.",
                        variant: "error",
                    })
                );
            }
        }
        // check if there an authentication error
        gqlErrors(err);
    } catch (err) {
        console.log("appolo catch", err);
        store.dispatch(
            Push({
                message: "Unauthenticated, Please Login and try again.",
                variant: "warning",
            })
        );
        // catch authentication error
        if (err instanceof AuthError) {
            store.dispatch(logout());
        }
    }
});

const appLink = from([errorLink, httpLink]);
export const apolloClient = new ApolloClient({
    link: appLink,
    cache: new InMemoryCache(),
});
