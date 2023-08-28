export const deleteUserHandler = (res, state, dispatch) => {
    if (res.data.result === "success") {
        const updateUsers = state.users.filter(user.id !== res.data.id)
        dispatch({
            type: "GET_USERS",
            payload: updateUsers,
        });
    }
}