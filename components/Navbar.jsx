"use client";
import React, { useRef, useState } from "react";
import Login from "./Form";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <header>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Travel_Pharao`s picture shop</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link className="mr-5 hover:text-gray-900" href="/">
            Home
          </Link>
          <Link href="/shop" className="mr-5 hover:text-gray-900">
            Shop
          </Link>
          <Link href="/about" className="mr-5 hover:text-gray-900">
            Das bin ich
          </Link>
          <Link href="/contact" className="mr-5 hover:text-gray-900">
            Kontakt
          </Link>
        </nav>
        <button
          onClick={() => router.push("/login")}
          className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
        >
          Login
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
// const handleNavbar = () => {
//   setIsNavShown(!isNavShown);
// };
// {
/* <div className="fixed left-0 top-0 w-full z-10 ease-in duration-300">
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
      <Link href="/shop">shop</Link>
    </li>
    <li className=" p-4 ">
      <Link href="/travels">Travels </Link>
    </li>
    <li className=" p-4 ">
      <Link href="/shoppingcard">Warenkorb</Link>
    </li>
    <li className=" p-4 ">
      <Link href="/">Contact</Link>
    </li>
  </ul>
</div>

{/* Mobile Button */
// }
// {!isNavShown && (
//   <AiOutlineMenu
//     className="sm:hidden block"
//     onClick={handleNavbar}
//     size={20}
//   />
// )}
// {isNavShown && (
//   <div className="sm:hidden top-0 left-0 right-0 bottom-0 flex justify-center items-center w-screen h-screen  bg-black text-center ease-in duration-300 z-0 text-white">
//     <ul>
//       <li className="p-4 text-4xl hover:text-gray-500">
//         <Link href="/">Home</Link>
//       </li>
//       <li className="p-4 text-4xl hover:text-gray-500">
//         <Link href="/#Gallery">Gallery</Link>
//       </li>
//       <li className="p-4 text-4xl hover:text-gray-500">
//         <Link href="/#travels">Travels </Link>
//       </li>
//       <li className="p-4 text-4xl hover:text-gray-500">
//         <Link href="/">Contact</Link>
//       </li>
//       <li className="flex justify-center items-center">
//         <AiOutlineClose onClick={handleNavbar} size={30} />
//       </li>
//     </ul>
//   </div>
// )}
// </div> */}
