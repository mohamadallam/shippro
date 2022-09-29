import { useSelector } from "react-redux";
const mapState = (state) => {
    return {
        isLoadingAuth: state.auth.loading,
        isLoadingShipment: state.shipment.loading,
    };
};
// show loading page if any reducer has loading state
const useLoading = () => {
    const { isLoadingAuth, isLoadingShipment } = useSelector(mapState);

    return isLoadingAuth || isLoadingShipment;
};
export default useLoading;
