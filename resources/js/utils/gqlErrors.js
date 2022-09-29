import store from "../redux/store";
import { Push } from "../redux/reducers/notify";
export class AuthError extends Error {}
export class ServerParseError extends Error {}
export function gqlErrors(err) {
    // Validation Errors
    let errors = {};
    (err?.graphQLErrors || []).map((error) => {
        if ("authorization" === error.extensions?.category) {
            errors = handleUnauthorizedrror(errors, error);
            return;
        }
        if ("validation" === error.extensions?.category) {
            const validation = error.extensions?.validation || {};
            errors = { ...errors, ...validation };
            return;
        }
        if ("authentication" === error.extensions?.category) {
            // handle it globaly
            return;
        }
        errors = handleUnknownError(errors, error);
    });
    return errors;
}

export const handleNetworkError = (err) => {
    // throw an  Unauthenticated Error
    if (err?.networkError && err.networkError.statusCode === 419) {
        throw new AuthError("Unauthenticated");
    }

    // avoid error loop when ServerParseError happened
    // (by example when user is logged in and he removes cookies suddently from the browser then he makes a request as authenticated user )
    // in this case  reload the app or Logout
    if (err?.networkError?.name === "ServerParseError") {
        // Reload the app
        // window.location.reload();
        // Logout
        throw new ServerParseError("Something Went Wrong!.");
    }

    // check if browser if offline
    if (typeof window !== "undefined" && !window.navigator.onLine) {
        store.dispatch(Push({ message: "Your browser is offline." }));
    }

    store.dispatch(
        Push({
            message: "Network error occurred.",
            variant: "error",
        })
    );
};

function handleUnknownError(errors, error) {
    errors = {
        ...errors,
        unknown: error.message || "Something Wrong!, Please try later.",
    };
    store.dispatch(
        Push({
            message: error.message || "Something Wrong!, Please try later.",
            variant: "error",
        })
    );
    return errors;
}
function handleUnauthorizedrror(errors, error) {
    errors = {
        ...errors,
        unauthorized: error.message || "This action is unauthorized.",
    };
    store.dispatch(
        Push({
            message: error.message || "This action is unauthorized.",
            variant: "error",
        })
    );
    return errors;
}
