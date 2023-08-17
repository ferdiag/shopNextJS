"use client";
import React, { useRef, useState } from "react";
import Login from "./login";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
const Navbar = () => {
  const [isNavShown, setIsNavShown] = useState(false);
  console.log(isNavShown);
  const handleNavbar = () => {
    setIsNavShown(!isNavShown);
  };
  console.log(isNavShown);
  return (
    <div className="fixed left-0 top-0 w-full z-10 ease-in duration-300">
      <div className="sm:flex hidden max-w-screen-xl z-10 m-auto justify-between items-center p-4 text-white">
        <Link href="/">
          {" "}
          <h1 className="font-bold text-4xl">capture</h1>
        </Link>
        <ul className="hidden sm:flex">
          <li className=" p-4 ">
            <Link href="/"></Link>
          </li>
          <li className=" p-4 ">
            <Link href="/#Gallery"></Link>
          </li>
          <li className=" p-4 ">
            <Link href="/#travels">Travels </Link>
          </li>
          <li className=" p-4 ">
            <Link href="/">Contact</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Button */}
      {!isNavShown && (
        <AiOutlineMenu
          className="sm:hidden block"
          onClick={handleNavbar}
          size={20}
        />
      )}
      {isNavShown && (
        <div className="sm:hidden top-0 left-0 right-0 bottom-0 flex justify-center items-center w-screen h-screen  bg-black text-center ease-in duration-300 z-0 text-white">
          <ul>
            <li className="p-4 text-4xl hover:text-gray-500">
              <Link href="/">Home</Link>
            </li>
            <li className="p-4 text-4xl hover:text-gray-500">
              <Link href="/#Gallery">Gallery</Link>
            </li>
            <li className="p-4 text-4xl hover:text-gray-500">
              <Link href="/#travels">Travels </Link>
            </li>
            <li className="p-4 text-4xl hover:text-gray-500">
              <Link href="/">Contact</Link>
            </li>
            <li className="flex justify-center items-center">
              <AiOutlineClose onClick={handleNavbar} size={30} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
