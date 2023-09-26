
export const getProductHandler = async (res, _, dispatch) => {
    const data = res.data
    console.log(data)
    if (data.result === "success") {
        dispatch({
            type: "SET_ARRAY_OF_PICTURES",
            payload: data.arrayOfProducts,
        });
    }
}