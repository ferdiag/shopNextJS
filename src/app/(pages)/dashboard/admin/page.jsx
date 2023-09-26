"use client";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { uuidv4 } from "../../../../utils/uuid4";
import DisplayProducts from "../../../../../components/displayArrays/DisplayProducts";
import DisplayArrayOfUsers from "../../../../../components/displayArrays/DisplayArrayOfUsers";
import { getProductHandler } from "../../../handlers/apiCalls/apiCallHandlers/getProductHandler";
import { Store } from "../../../context/Store";
import { newProductHandler } from "../../../handlers/apiCalls/apiCallHandlers/newProductHandler";
import { apiCallHandler } from "../../../handlers/apiCalls/apicCallhandler";
import { getUsersHandler } from "../../../handlers/apiCalls/apiCallHandlers/getUsersHandler";
import { deleteUserHandler } from "../../../handlers/apiCalls/apiCallHandlers/deleteUserHandler";
const AdminPage = () => {
  const { state, dispatch } = useContext(Store);

  //this useEffect is set up so that the shop page doesnt show the delete buttons.
  useEffect(() => {
    dispatch({
      type: "SET_RESOURCE",
      payload: "admin",
    });
  }, []);

  const initValuesInput = {
    nameOfProduct: "",
    description: "",
    price: "",
    category: "",
    file: undefined,
  };
  const [input, setInput] = useState(initValuesInput);
  const [isUsersShown, setIsUserShown] = useState(false);

  const handelChangeFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setInput((prevState) => {
        return { ...prevState, file };
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (
      input.nameOfProduct.length === 0 ||
      input.description.length === 0 ||
      input.price.length === 0 ||
      input.category.length === 0
    ) {
      console.log("Bitte alle Felder ausfüllen");
      return;
    }

    if (!input.file) {
      console.log("du hast keine Datei hochgeladen");
      return;
    }
    const mimeType = input.file.type;
    const fileType = mimeType.split(/[/ ]+/).pop();
    const id = uuidv4();
    const price = parseFloat(input.price).toFixed(2);

    const data = new FormData();
    data.append("file", input.file, "file");
    data.append("id", `${id}`);
    data.append("type", `${fileType}`);
    data.append("price", `${price}`);

    //get all except file and merge it with id and fileType

    const { file, ...rest } = input;
    const payload = { ...rest, id, fileType };

    try {
      await axios
        .post("http://192.168.0.149:4000/uploads", data)
        .then(async (res) => {
          if (res.data.result === "success") {
            const props = {
              endpoint: "pics/newPic",
              payload: payload,
              apiCall: newProductHandler,
              state,
              dispatch,
              method: "post",
            };
            await apiCallHandler(props);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ marginTop: "300px" }}>
      Admin
      <h3>neues Bild hochladen</h3>
      <form onSubmit={handleUpload}>
        <label>Bilddatei</label>
        <input
          onChange={(e) => handelChangeFileUpload(e)}
          type="file"
          name="file"
          accept="image/jpg,image/png"
        />

        <label htmlFor="name">Name</label>
        <input
          style={{ border: "1px solid black" }}
          type="text"
          name="name"
          id="name"
          value={input.nameOfProduct}
          onChange={(e) =>
            setInput((prevState) => {
              return { ...prevState, nameOfProduct: e.target.value };
            })
          }
        />
        <label htmlFor="category">Kategorie</label>
        <input
          style={{ border: "1px solid black" }}
          type="text"
          name="category"
          id="category"
          value={input.category}
          onChange={(e) =>
            setInput((prevState) => {
              return { ...prevState, category: e.target.value };
            })
          }
        />
        <label htmlFor="description">Beschreibung</label>
        <input
          style={{ border: "1px solid black" }}
          type="text"
          name="description"
          id="description"
          value={input.description}
          onChange={(e) =>
            setInput((prevState) => {
              return { ...prevState, description: e.target.value };
            })
          }
        />
        <label htmlFor="price">Preis</label>
        <input
          style={{ border: "1px solid black" }}
          type="number"
          name="price"
          id="price"
          value={input.price}
          onChange={(e) =>
            setInput((prevState) => {
              return { ...prevState, price: e.target.value };
            })
          }
        />
        <button onClick={handleUpload}>hochladen</button>
      </form>
      <button
        onClick={async () => {
          if (state.arrayOfProducts.length === 0) {
            const props = {
              endpoint: "pics/getPic",
              apiCall: getProductHandler,
              state,
              dispatch,
              method: "get",
            };
            await apiCallHandler(props);

            dispatch({
              type: "SET_IS_PRODUCT_SHOWN",
              payload: true,
            });
            return;
          }

          let payload = false;
          if (!state.isProductShown) {
            payload = true;
          }
          dispatch({
            type: "SET_IS_PRODUCT_SHOWN",
            payload,
          });
        }}
      >
        {state.isProductShown ? "hide pictures" : "showPictures"}
      </button>
      {state.isProductShown && (
        <DisplayProducts
          resource={state.resource}
          dispatch={dispatch}
          baseSrc={state.baseSrc}
          arrayOfProducts={state.arrayOfProducts}
        />
      )}
      <button
        onClick={async () => {
          if (state.users.length === 0) {
            const props = {
              endpoint: "admin/getUsers",
              apiCall: getUsersHandler,
              state,
              dispatch,
              method: "get",
            };
            await apiCallHandler(props);
            setIsUserShown(true);
            return;
          }

          setIsUserShown((prevState) => !prevState);
        }}
      >
        show Users
      </button>
      {isUsersShown && (
        <div>
          <DisplayArrayOfUsers users={state.users} />
        </div>
      )}
    </div>
  );
};

export default AdminPage;
