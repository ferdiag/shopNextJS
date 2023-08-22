"use client";
import React, { useContext, useEffect, useRef } from "react";
import { Store } from "../src/app/context/Store";

const ErrorModal = (props) => {
  const modalRef = useRef();
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    dispatch({
      type: "SET_MODAL",
      payload: modalRef.current,
    });
  }, [modalRef, dispatch]);
  return (
    <dialog style={{ marginTop: "100px" }} ref={modalRef} data-model>
      <div>
        <h2>Bitte folgende Fehler beheben</h2>
        {state.errorModalInput.map((error, key) => (
          <p key={key}>{error}</p>
        ))}
      </div>
    </dialog>
  );
};

export default ErrorModal;
