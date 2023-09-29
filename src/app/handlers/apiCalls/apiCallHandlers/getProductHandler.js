
export const getProductHandler = async (res, _, dispatch) => {
    const data = res.data
    const arrayWithIsLiked = data.arrayOfProducts.map(product => {
        return {
            ...product, isLiked: false
        }
    })
    if (data.result === "success") {
        dispatch({
            type: "SET_ARRAY_OF_PRODUCTS",
            payload: arrayWithIsLiked,
        });
    }
}