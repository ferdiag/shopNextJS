"use client";
import { createContext, useReducer } from "react";
//wrapped a component in _app.js
const Store = createContext();

const globals = {
  isLoggedIn: false,
  errorModalInput: [],
  modal: {},
  users: [],
  shoppingCard: [],
  arrayOfPictures: [],
  userData: {},
  resource: "",
  baseSrc: "http://192.168.0.149:4000/uploads/uploads/",
  isProductShown: false,
  indexOfCurrentProduct: undefined,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_PRODUCT":
      return {
        ...state,
        indexOfCurrentProduct: action.payload,
      };
    case "SET_RESOURCE":
      return {
        ...state,
        resource: action.payload,
      };
    case "USER_LOGIN":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
      };
    case "SET_ERROR_MODAL_INPUT":
      return {
        ...state,
        errorModalInput: action.payload,
      };
    case "SET_MODAL":
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
        arrayOfPictures: action.payload,
      };
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_IS_PRODUCT_SHOWN":
      return {
        ...state,
        isProductShown: action.payload,
      };
  }
};

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, globals);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
}

export { Store, StoreProvider };
