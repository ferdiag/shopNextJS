/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useContext, useState } from "react";
import { Store } from "../../../context/Store";
import { usePathname } from "next/navigation";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import updateProductHandler from "../../../handlers/./apiCalls/apiCallHandlers/updateProductHandler";
import { apiCallHandler } from "../../../handlers/apiCalls/apicCallhandler";

const ProductPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const pathname = usePathname();
  const arrayPathname = pathname.split("/");

  const id = arrayPathname[arrayPathname.length - 1];
  const { state, dispatch } = useContext(Store);
  const { baseSrc, arrayOfProducts } = state;

  const currentProduct = arrayOfProducts.find((product) => product.id === id);
  //avoiding a crash after reload of page

  if (arrayOfProducts.length === 0) {
    (async () => {
      const res = await axios.get("/api/pics/getProduct");
      dispatch({
        type: "SET_ARRAY_OF_PRODUCTS",
        payload: res.data.arrayOfProducts,
      });
    })();
    return <div>...loading</div>;
  }

  const src = baseSrc
    .concat("", currentProduct.id)
    .concat(".", currentProduct.fileType);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/3 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={src}
          />
          <div className="lg:w-1/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {currentProduct.category}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {currentProduct.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">{currentProduct.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                    <option>1600x800</option>
                    <option>1200*800</option>
                    <option>640x320</option>
                    <option>320*160</option>
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                {currentProduct.price}.00€
              </span>
              <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                kaufen
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                {!currentProduct.isLiked ? (
                  <AiOutlineHeart
                    onClick={async () => {
                      currentProduct.isLiked = true;
                      const updateLikes = currentProduct.likes + 1;
                      const payload = {
                        id: currentProduct.id,
                        likes: updateLikes,
                      };
                      const props = {
                        endpoint: "pics/updateProduct",
                        payload: payload,
                        apiCall: updateProductHandler,
                        state: state,
                        dispatch,
                        method: "post",
                      };
                      await apiCallHandler(props);
                      setIsLiked(true);
                    }}
                  />
                ) : (
                  <AiFillHeart
                    onClick={async () => {
                      currentProduct.isLiked = false;
                      const updateLikes =
                        currentProduct.likes != 0
                          ? currentProduct.likes - 1
                          : 0;

                      const payload = {
                        id: currentProduct.id,
                        likes: updateLikes,
                      };
                      const props = {
                        endpoint: "pics/updateProduct",
                        payload: payload,
                        apiCall: updateProductHandler,
                        state,
                        dispatch,
                        method: "post",
                      };
                      await apiCallHandler(props);
                      setIsLiked(false);
                    }}
                  />
                )}
              </button>
              <div>likes:{currentProduct.likes}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
