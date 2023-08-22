"use client";
import { createContext, useReducer } from "react";
//wrapped a component in _app.js
const Store = createContext();

const init = {
  isLoggedIn: false,
  errorModalInput: [],
  modal: {},
  shoppingCard: [],
  arrayOfPictues: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "SET_ERROR_MODAL_INPUT":
      console.log(action.payload);
      return {
        ...state,
        errorModalInput: action.payload,
      };
    case "SET_MODAL":
      console.log(action.payload);
      return {
        ...state,
        modal: action.payload,
      };
    case "SET_SHOPPINGCARD":
      return {
        ...state,
        shoppingCard: action.payload,
      };
    case "SET_ARRAY_OF_PICTURES":
      return {
        ...state,
        arrayOfPictues: action.payload,
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
