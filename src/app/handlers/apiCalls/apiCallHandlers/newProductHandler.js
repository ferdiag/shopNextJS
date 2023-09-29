import { apiCallHandler } from "../apicCallhandler";
import { getProductHandler } from "./getProductHandler";

export const newProductHandler = async (res, state, dispatch) => {
    //apiCallHandler is just called if the state.arrayOfProducts.length===0, this check has to be made to avoid bug.

    if (res.data.result === "success") {
        if (!state.isProductShown && state.arrayOfProducts.length != 0) {
            const getProductProps = {
                endpoint: "pics/getProduct",
                apiCall: getProductHandler,
                state,
                dispatch,
                method: "get"
            }
            await apiCallHandler(getProductProps)
            return
        }

        const newArrayOfPics = [...state.arrayOfProducts, res.data.dataOfNewPic]
        dispatch({
            type: "SET_ARRAY_OF_PRODUCTS",
            payload: newArrayOfPics
        });
    }
}