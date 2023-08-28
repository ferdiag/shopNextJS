import { apiCallHandler } from "../apicCallhandler";
import { getProductHandler } from "./getProductHandler";

export const newProductHandler = async (res, state, dispatch) => {
    //due to the fact that apiCallHandler is just called if the state.arrayOfPictures.length===0, this check has to be made to avoid bug.

    if (res.data.result === "success") {
        if (!state.isProductShown && state.arrayOfPictures.length != 0) {
            const getPicProps = {
                endpoint: "pics/getPic",
                apiCall: getProductHandler,
                state,
                dispatch,
                method: "get"
            }
            await apiCallHandler(getPicProps)
            return
        }

        const newArrayOfPics = [...state.arrayOfPictures, res.data.dataOfNewPic]
        dispatch({
            type: "SET_ARRAY_OF_PICTURES",
            payload: newArrayOfPics
        });
    }
}