import { ME, apolloClient, LOGIN, LOGOUT, REGISTER } from "../../graphql";
import store from "../../redux/store";
import { Push } from "../../redux/reducers/notify";
import { gqlErrors } from "../../utils";
// convert it to enum in typescript
export const Roles = {
    USER: "USER",
    PUBLIC: "PUBLIC",
};
class AuthService {
    constructor() {}
    static role(user) {
        return user ? Roles.USER : Roles.PUBLIC;
    }
    static handleError(err) {
        let errors = gqlErrors(err);

        return { success: false, user: null, errors };
    }
    static async logout() {
        try {
            let user = await apolloClient.mutate({
                mutation: LOGOUT,
                variables: {},
            });
            store.dispatch(
                Push({ message: "logout successfully", variant: "success" })
            );
            return { success: true, user, errors: null };
        } catch (err) {
            return this.handleError(err);
        }
    }

    static async register({ email, password, name }) {
        try {
            const response = await apolloClient.mutate({
                mutation: REGISTER,
                variables: { email, password, name },
            });
            const user = response.data?.register || null;
            store.dispatch(
                Push({ message: "register successfully", variant: "success" })
            );
            return { success: true, user, errors: null };
        } catch (err) {
            return this.handleError(err);
        }
    }

    static async login({ email, password }) {
        try {
            const response = await apolloClient.mutate({
                mutation: LOGIN,
                variables: {
                    email,
                    password,
                },
            });
            const user = response.data?.login || null;
            store.dispatch(
                Push({ message: "login successfully", variant: "success" })
            );
            return { success: true, user, errors: null };
        } catch (err) {
            return this.handleError(err);
        }
    }

    static async me() {
        try {
            const response = await apolloClient.query({
                query: ME,
            });
            const user = response.data.me;

            store.dispatch(
                Push({
                    message: "Fetch User Info Successfully",
                    variant: "success",
                })
            );
            return { success: true, user, errors: null };
        } catch (err) {
            return this.handleError(err);
        }
    }
    static async isAuthenticated() {
        try {
            const response = await apolloClient.query({
                query: ME,
            });
            const user = response.data.me;
            store.dispatch(
                Push({
                    message: "Auto Login successfully",
                    variant: "success",
                })
            );
            return user;
        } catch (err) {}
    }
}
export default AuthService;
