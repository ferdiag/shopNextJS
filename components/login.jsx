"use client";
import axios from "axios";
import React, { useRef, useState } from "react";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleLogin = async () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    if (email.length === 0 || password.length === 0) {
      console.log("Bitte geben sie ein Passwort oder ihre Email ein");
      return;
    }
    if (password.length < 8) {
      console.log("Das Passwort muss 8 Zeichen beinhalten");
      return;
    }
    const arrayPassword = password.split("");
    const isUppercase = arrayPassword.filter(
      (letter) => letter == letter.toUpperCase()
    )[0];
    if (!isUppercase) {
      console.log("Das Passwort muss einen Großbuchstaben behinhalten ");
      return;
    }
    const isLowerCase = arrayPassword.filter(
      (letter) => letter == letter.toLowerCase()
    )[0];
    if (!isLowerCase) {
      console.log("Das Passwort muss einen Kleinbuchstaben behinhalten ");
      return;
    }
    const isNumber = arrayPassword.filter((letter) => {
      const res = parseInt(letter, 10);
      return res;
    });
    if (!isNumber) {
      console.log("Das Passwort muss eine Zahl behinhalten behinhalten ");
    }
    // console.log(emailRef.current.value, passwordRef.current.value);
    const res = await axios.post("/api/users/login", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    console.log(res.data);
  };

  const handleVisibility = () => {
    setIsVisible((preVal) => !preVal);
    console.log(passwordRef.current);

    isVisible
      ? (passwordRef.current.type = "password")
      : (passwordRef.current.type = "text");
  };
  return (
    <form>
      <label htmlFor="email">email</label>
      <input
        placeholder="max@mustermann.gmail.de"
        ref={emailRef}
        id="email"
        type="email"
        maxLength="20"
      />
      <label htmlFor="email">Passwort</label>
      <input ref={passwordRef} id="email" type="password" maxLength="20" />
      <button onClick={handleVisibility}>show password</button>
      <button onClick={handleLogin}>login</button>
    </form>
  );
};

export default Login;
