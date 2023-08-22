"use client";
import axios from "axios";
import React, { useRef, useState, useContext } from "react";
import { Store } from "../src/app/context/Store";

const Login = (props) => {
  const pathname = props.pathname.slice(1);
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordRepeatdRef = useRef(null);
  const { state, dispatch } = useContext(Store);
  const [isVisible, setIsVisible] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    let errors = [];

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const passwordRepeat = passwordRepeatdRef.current.value.trim();

    if (email.length === 0) {
      if (errors.length === 0) emailRef.current.focus();
      emailRef.current.style = {
        ...emailRef.current.style,
        border: "border 1px solid red",
      };
      // emailRef.current = { ...emailRef.current, isError: true };

      errors = [...errors, "Bitte geben sie eine E-Mail ein"];
    }
    if (password.length === 0) {
      if (errors.length === 0) passwordRef.current.focus();
      errors = [...errors, "Bitte geben sie ein Passwort"];
    }
    if (password.length < 8) {
      if (errors.length === 0) passwordRef.current.focus();
      errors = [...errors, "Das Passwort muss 8 Zeichen beinhalten"];
    }
    if (password !== passwordRepeat) {
      if (errors.length === 0) passwordRepeat.current.focus();
      errors = [...errors, "die Passwörter sind nicht identisch"];
    }
    const arrayPassword = password.split("");
    const isUppercase = arrayPassword.filter(
      (letter) => letter == letter.toUpperCase()
    )[0];

    if (!isUppercase) {
      if (errors.length === 0) passwordRef.current.focus();
      errors = [
        ...errors,
        "Das Passwort muss einen Großbuchstaben behinhalten ",
      ];
    }
    const isLowerCase = arrayPassword.filter(
      (letter) => letter == letter.toLowerCase()
    )[0];
    if (!isLowerCase) {
      if (errors.length === 0) passwordRef.current.focus();
      errors = [
        ...errors,
        "Das Passwort muss einen Kleinbuchstaben behinhalten ",
      ];
    }

    const isNumber = arrayPassword.filter((letter) => {
      const res = parseInt(letter, 10);
      return res;
    });
    if (!isNumber) {
      if (errors.length === 0) passwordRef.current.focus();
      errors = [
        ...errors,
        "Das Passwort muss eine Zahl behinhalten behinhalten",
      ];
    }
    // console.log(emailRef.current.value, passwordRef.current.value);
    if (errors.length > 0) {
      dispatch({
        type: "SET_ERROR_MODAL_INPUT",
        payload: errors,
      });
      state.modal.open = true;

      return;
    }
    const path = `/api/users/${pathname}`;
    console.log(path);
    await axios
      .post(path, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        username: usernameRef.current.value,
      })
      .then((data) => {
        if (data.data.result === "error") {
          dispatch({
            type: "SET_ERROR_MODAL_INPUT",
            payload: ["Der Nutzer ist bereits vorhanden"],
          });
          state.modal.open = true;
        }
      });
  };

  const handleVisibility = (e) => {
    e.preventDefault();
    setIsVisible((preVal) => !preVal);

    isVisible
      ? (passwordRef.current.type = "password")
      : (passwordRef.current.type = "text");
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="email">email</label>
      <input
        placeholder="max@mustermann.gmail.de"
        ref={emailRef}
        id="email"
        type="email"
        maxLength="20"
        style={{ border: "1px solid red" }}
      />
      <label htmlFor="password">Passwort</label>
      <input ref={passwordRef} id="password" type="password" maxLength="20" />
      <button onClick={handleVisibility}>show password</button>
      <label htmlFor="passwordRepeatdRef">Passwort wiederholen</label>
      {props.pathname && (
        <input
          ref={passwordRepeatdRef}
          id="passwordRepeatdRef"
          type="password"
          maxLength="20"
        />
      )}
      {props.pathname && <label htmlFor="username">Benutzername</label>}
      {props.pathname && (
        <input
          placeholder="Dein Benutzername"
          ref={usernameRef}
          id="username"
          type="username"
          maxLength="20"
        />
      )}
      <button onClick={handleLogin}>{pathname}</button>
    </form>
  );
};

export default Login;
