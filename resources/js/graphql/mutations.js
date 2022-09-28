import gql from "graphql-tag";
//  Auth Mutations
export const LOGIN = gql`
    # Login mutation
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            name
            email
        }
    }
`;

export const LOGOUT = gql`
    # # Logout mutation
    mutation Logout {
        logout {
            id
            name
            email
        }
    }
`;
export const REGISTER = gql`
    # Register mutation
    mutation Register($email: String!, $password: String!, $name: String!) {
        register(email: $email, password: $password, name: $name) {
            id
            name
            email
        }
    }
`;

//  Shippment Mutations
export const ADD_SHIPMENT = gql`
    # AddShipment mutation
    mutation AddShipment(
        $waybill: String!
        $customer_address: String!
        $customer_name: String!
        $customer_phone_number: String!
    ) {
        addShipment(
            input: {
                waybill: $waybill
                customer_address: $customer_address
                customer_name: $customer_name
                customer_phone_number: $customer_phone_number
            }
        ) {
            id
            waybill
            customer_address
            customer_name
            customer_phone_number
        }
    }
`;

export const UPDATE_SHIPMENT = gql`
    # updateShipment mutation
    mutation updateShipment(
        $id: ID
        $waybill: String!
        $customer_address: String!
        $customer_name: String!
        $customer_phone_number: String!
    ) {
        updateShipment(
            input: {
                id: $id
                waybill: $waybill
                customer_address: $customer_address
                customer_name: $customer_name
                customer_phone_number: $customer_phone_number
            }
        ) {
            id
            waybill
            customer_address
            customer_name
            customer_phone_number
        }
    }
`;

export const DELETE_SHIPMENT = gql`
    # deleteShipment mutation
    mutation deleteShipment($id: ID!) {
        deleteShipment(id: $id) {
            id
            waybill
            customer_address
            customer_name
            customer_phone_number
        }
    }
`;
