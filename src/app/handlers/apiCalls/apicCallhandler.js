import axios from "axios"

export const apiCallHandler = async ({ endpoint, apiCall, state, dispatch, method, payload }) => {
    console.log("hallo")
    if (method === "get") {
        await axios.get(`/api/${endpoint}`)
            .then(data => apiCall(data, state, dispatch))
    } else {
        await axios.post(`/api/${endpoint}`, payload)
            .then(data => apiCall(data, state, dispatch))
    }
}