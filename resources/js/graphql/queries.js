import gql from "graphql-tag";
// Auth Queries
export const ME = gql`
    query Me {
        me {
            id
            name
            email
        }
    }
`;

// Shippment Queries

export const SHIPMENTS = gql`
    query Shippments($first: Int!, $page: Int!) {
        me {
            shipments(first: $first, page: $page) {
                data {
                    id
                    waybill
                    customer_address
                    customer_name
                    customer_phone_number
                }
            }
        }
    }
`;
export const SHIPMENT = gql`
    query Shippment($id: ID!) {
        shipment(id: $id) {
            id
            waybill
            customer_address
            customer_name
            customer_phone_number
        }
    }
`;
