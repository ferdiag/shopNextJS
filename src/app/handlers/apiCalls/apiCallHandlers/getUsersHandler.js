export const getUsersHandler = (res, _, dispatch) => {
    if (res.data.result === "success") {
        dispatch({
            type: "GET_USERS",
            payload: res.data.users
        });
    }
}