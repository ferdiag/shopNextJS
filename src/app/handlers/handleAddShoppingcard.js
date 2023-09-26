export const handleAddShoppingcard = (e, i, state, dispatch) => {
    let newShoppingCard = []

    const indexOfItem = state.shoppingCard.findIndex(item => item._id == state.arrayOfProducts[i]._id)

    if (indexOfItem >= 0) {
        newShoppingCard = state.shoppingCard.with(
            indexOfItem, {
            ...state.shoppingCard[indexOfItem],
            amount: state.shoppingCard[indexOfItem].amount + 1
        })
    } else {
        newShoppingCard = [
            ...state.shoppingCard, {
                ...state.arrayOfProducts[i], amount: 1
            }]
    }

    dispatch({
        type: "SET_SHOPPINGCARD",
        payload: newShoppingCard,
    });
}
