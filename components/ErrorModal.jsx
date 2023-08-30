"use client";
import React, { useContext, useEffect, useRef } from "react";
import { Store } from "../src/app/context/Store";

const ErrorModal = (props) => {
  //modal will be triggered by other components. An id has to be set for detecting a click on the backdrop.

  const modalRef = useRef();
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    dispatch({
      type: "SET_MODAL",
      payload: modalRef.current,
    });
  }, [modalRef, dispatch]);

  return (
    <dialog
      onClick={(e) => e.target.id === "backdrop" && modalRef.current.close()}
      style={{
        marginTop: "100px",
        padding: "2rem",
        border: "black solid 2px ",
        borderRadius: "20px",
        boxShadow: "1px 1px gray",
      }}
      ref={modalRef}
      data-model
      id="backdrop"
    >
      <div className="bg-co w-full h-full bg-indigo-500">
        <div className="bg-co">
          <h2>Bitte folgende Fehler beheben</h2>
        </div>
        <div>
          {state.errorModalInput.map((error, key) => (
            <p key={key}>{error}</p>
          ))}

          <button onClick={() => modalRef.current.close()}>X</button>
        </div>
      </div>
    </dialog>
  );
};

export default ErrorModal;
