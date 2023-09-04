"use client";
import axios from "axios";
import React, { useRef, useState, useContext } from "react";
import { Store } from "../src/app/context/Store";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Form = (props) => {
  // handles submit and error for the Login and Signup.
  //Errors will be stored in an Array and the errormodal will be triggered.
  // state.modal.showModal() has to be used otherwise there is no backrop color.

  const router = useRouter();

  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordRepeatdRef = useRef(null);

  const { state, dispatch } = useContext(Store);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = props.pathname.slice(1);

  const handleErrorStyle = (itemRef) => {
    errors.length === 0 && itemRef.current.focus();

    const errorStyle = ["border-red-600", "rounded", "border-2"];
    errorStyle.map((className) => itemRef.current.classList.add(className));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let errors = [];

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (pathname === "signup") {
      const passwordRepeat = passwordRepeatdRef.current.value.trim();
      const username = usernameRef.current.value.trim();

      if (username.length === 0) {
        handleErrorStyle(usernameRef);

        errors = [...errors, "Bitte geben Sie einen Benutzernamen ein"];
      }
      if (password !== passwordRepeat) {
        handleErrorStyle(passwordRepeatdRef);

        errors = [...errors, "die Passwörter sind nicht identisch"];
      }
    }

    if (email.length === 0) {
      handleErrorStyle(emailRef);
      errors = [...errors, "eine E-Mail eingeben"];
    }
    if (password.length === 0) {
      handleErrorStyle(passwordRef);

      errors = [...errors, "ein Passwort eingeben"];
    }
    if (password.length < 8) {
      handleErrorStyle(passwordRef);

      errors = [...errors, "Das Passwort muss 8 Zeichen beinhalten"];
    }

    const arrayPassword = password.split("");
    const isUppercase = arrayPassword.filter(
      (letter) => letter == letter.toUpperCase()
    )[0];

    if (!isUppercase) {
      handleErrorStyle(passwordRef);

      errors = [
        ...errors,
        "Das Passwort muss einen Großbuchstaben behinhalten ",
      ];
    }
    const isLowerCase = arrayPassword.filter(
      (letter) => letter == letter.toLowerCase()
    )[0];

    if (!isLowerCase) {
      handleErrorStyle(passwordRef);
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
      handleErrorStyle(passwordRef);

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

      state.modal.showModal();
      return;
    }

    const path = `/api/users/${pathname}`;

    await axios
      .post(path, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        username: pathname === "signup" && usernameRef.current.value,
        pathname,
      })
      .then((data) => {
        console.log(data);
        if (
          (data.data.result === "error") &
          (data.data.pathname === "signup")
        ) {
          state.modal.showModal();

          dispatch({
            type: "SET_ERROR_MODAL_INPUT",
            payload: ["Der Nutzer ist bereits vorhanden"],
          });
        }
        if (
          (data.data.result === "success") &
          (data.data.pathname === "login")
        ) {
          dispatch({
            type: "SET_USER_DATA",
            payload: data.data.user,
          });
          router.push(`/dashboard/${data.data.user._id}`);
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
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-8/12 h-3/5 mt-3.5 justify-center "
      onSubmit={(e) => handleFormSubmit(e)}
    >
      <div className="relative mb-4">
        <label htmlFor="email">email</label>
        <input
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="max@mustermann.gmail.de"
          ref={emailRef}
          id="email"
          type="email"
          maxLength="20"
        />
      </div>
      <div className="relative mb-4">
        <label htmlFor="password" className="leading-7 text-sm text-gray-600">
          Passwort
        </label>
        <input
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ref={passwordRef}
          id="password"
          type="password"
          maxLength="20"
        />
        <button onClick={handleVisibility}>show password</button>
      </div>
      <div className="relative mb-4">
        {pathname === "signup" && (
          <label
            htmlFor="passwordRepeatdRef"
            className="leading-7 text-sm text-gray-600"
          >
            Passwort wiederholen
          </label>
        )}
        {pathname === "signup" && (
          <input
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            ref={passwordRepeatdRef}
            id="passwordRepeatdRef"
            type="password"
            maxLength="20"
          />
        )}
      </div>
      {pathname === "signup" && (
        <div className="relative mb-4">
          <label htmlFor="username" className="leading-7 text-sm text-gray-600">
            Benutzername
          </label>

          <input
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="Dein Benutzername"
            ref={usernameRef}
            id="username"
            type="username"
            maxLength="20"
          />
        </div>
      )}
      <button onClick={(e) => handleFormSubmit(e)}>{pathname}</button>
      <p>
        wenn du noch keinen Account hast, dann kannst du dich hier{" "}
        <Link href={"/signup"}>anmelden</Link>
      </p>
    </form>
  );
};

export default Form;
