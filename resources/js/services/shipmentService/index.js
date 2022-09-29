import { gqlErrors } from "../../utils";
import { Push } from "../../redux/reducers/notify";
import store from "../../redux/store";
import {
    SHIPMENTS,
    apolloClient,
    ADD_SHIPMENT,
    DELETE_SHIPMENT,
    UPDATE_SHIPMENT,
    SHIPMENT,
} from "../../graphql";
import { setErrors } from "../../redux/reducers/shipment";
class ShipmentService {
    static handleError(err) {
        let errors = gqlErrors(err);
        store.dispatch(setErrors(errors));
        return { success: false, shipment: null, shipments: null, errors };
    }
    static async insert({
        waybill,
        customer_address,
        customer_name,
        customer_phone_number,
    }) {
        try {
            const response = await apolloClient.mutate({
                mutation: ADD_SHIPMENT,
                variables: {
                    waybill,
                    customer_address,
                    customer_name,
                    customer_phone_number,
                },
            });
            store.dispatch(
                Push({
                    message: "Add shipment successfully",
                    variant: "success",
                })
            );
            const shipment = response.data?.addShipment;
            return { success: true, shipment, errors: null };
        } catch (err) {
            return this.handleError(err);
        }
    }

    static async show({ id }) {
        try {
            const response = await apolloClient.query({
                query: SHIPMENT,
                variables: { id },
            });
            const shipment = response.data?.shipment;
            store.dispatch(
                Push({
                    message: "Fetch shipment successfully",
                    variant: "success",
                })
            );
            return { success: true, shipment, errors: null };
        } catch (err) {
            return this.handleError(err);
        }
    }

    static async update({
        id,
        waybill,
        customer_address,
        customer_name,
        customer_phone_number,
    }) {
        try {
            const response = await apolloClient.mutate({
                mutation: UPDATE_SHIPMENT,
                variables: {
                    id,
                    waybill,
                    customer_address,
                    customer_name,
                    customer_phone_number,
                },
            });
            const shipment = response.data?.updateShipment;
            store.dispatch(
                Push({
                    message: "Update shipment successfully",
                    variant: "success",
                })
            );
            return { success: true, shipment, errors: null };
        } catch (err) {
            return this.handleError(err);
        }
    }

    static async delete({ id }) {
        console.log(id);
        try {
            const response = await apolloClient.mutate({
                mutation: DELETE_SHIPMENT,
                variables: {
                    id,
                },
            });
            const shipment = response.data?.deleteShipment;
            store.dispatch(
                Push({
                    message: "Delete shipment successfully",
                    variant: "success",
                })
            );
            return { success: true, shipment, errors: null };
        } catch (err) {
            return this.handleError(err);
        }
    }

    static async fetchAll({ first = 2, page = 0 }) {
        try {
            const response = await apolloClient.query({
                query: SHIPMENTS,
                variables: { first, page },
            });
            const shipments = response.data?.me?.shipments?.data;
            const shipmentCount = response.data?.me?.shipmentCount;
            store.dispatch(
                Push({
                    message: "Fetch All Shipments successfully",
                    variant: "success",
                })
            );
            return { success: true, shipments, shipmentCount, errors: null };
        } catch (err) {
            return this.handleError(err);
        }
    }
}
export default ShipmentService;
