"use client";
import axios from "axios";
import React, { useRef, useState } from "react";

const Login = (props) => {
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const passworRepeatdRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [arrayOfErrors, setArrayOfErrors] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    let errors = [];

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const passworRepeat = passworRepeatdRef.current.value.trim();

    if (email.length === 0 || password.length === 0) {
      errors = [...errors, "Bitte geben sie ein Passwort oder ihre Email ein"];
    }
    if (password.length < 8) {
      errors = [...errors, "Das Passwort muss 8 Zeichen beinhalten"];
    }
    if (password !== passworRepeat) {
      errors = [...errors, "die Passwörter sind nicht identisch"];
    }
    const arrayPassword = password.split("");
    const isUppercase = arrayPassword.filter(
      (letter) => letter == letter.toUpperCase()
    )[0];

    if (!isUppercase) {
      errors = [
        ...errors,
        "Das Passwort muss einen Großbuchstaben behinhalten ",
      ];
    }
    const isLowerCase = arrayPassword.filter(
      (letter) => letter == letter.toLowerCase()
    )[0];
    if (!isLowerCase) {
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
      errors = [
        ...errors,
        "Das Passwort muss eine Zahl behinhalten behinhalten",
      ];
    }
    // console.log(emailRef.current.value, passwordRef.current.value);
    if (errors.length > 0) {
      setArrayOfErrors(errors);
      return;
    }
    await axios.post(`/api/users/${props.pathname}`, {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  const handleVisibility = (e) => {
    e.preventDefault();
    setIsVisible((preVal) => !preVal);
    console.log(passwordRef.current);

    isVisible
      ? (passwordRef.current.type = "password")
      : (passwordRef.current.type = "text");
  };
  console.log(props.pathname);
  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="email">email</label>
      <input
        placeholder="max@mustermann.gmail.de"
        ref={emailRef}
        id="email"
        type="email"
        maxLength="20"
      />
      <label htmlFor="password">Passwort</label>
      <input ref={passwordRef} id="password" type="password" maxLength="20" />
      <label htmlFor="passworRepeatdRef">Passwort wiederholen</label>
      {props.pathname && (
        <input
          ref={passworRepeatdRef}
          id="passworRepeatdRef"
          type="passworRepeatdRef"
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
      <button onClick={handleVisibility}>show password</button>
      <button onClick={handleLogin}>{props.pathname}</button>
    </form>
  );
};

export default Login;
