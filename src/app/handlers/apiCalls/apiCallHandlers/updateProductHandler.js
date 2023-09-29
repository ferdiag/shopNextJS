
const updateProductHandler = (res, state, dispatch) => {
    const { id, key } = res.data

    const newArrayOfProducts = state.arrayOfProducts.map(product => {
        if (product.id === id) {
            return {
                ...product, [key]: res.data[key]
            }
        }
        else { return product }
    })
    dispatch({
        type: "SET_ARRAY_OF_PRODUCTS",
        payload: newArrayOfProducts
    });
}

export default updateProductHandler