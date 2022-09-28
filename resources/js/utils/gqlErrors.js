import store from "../redux/store";
import { Push } from "../redux/reducers/notify";
export class AuthError extends Error {}
export function gqlErrors(err) {
    // throw an  Unauthenticated Error
    if (err?.networkError && err.networkError.statusCode === 419) {
        throw new AuthError("Unauthenticated");
    }
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
        errors = handleUnknownError(errors, error);
    });
    return errors;
}
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
