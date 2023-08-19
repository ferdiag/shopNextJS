"use client"
import { createContext, useReducer } from 'react';
//wrapped a component in _app.js
const Store = createContext();

const init = {
    isLoggedIn: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return {
                ...state,
                isLoggedIn: true,
            };

    }
};

function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, init);
    return (
        <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
    );
}

export { Store, StoreProvider };