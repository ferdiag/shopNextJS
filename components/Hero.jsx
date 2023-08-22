import React from "react";

const Hero = ({ heading, message }) => {
  return (
    <div className="flex items-center justify-center h-screen -z-20 bg-fixed bg-center bg-cover custom-img">
      <div className="absolute top-0 -z-10 left-0 right-0 bottom-0 bg-black/60"></div>
      <div className="items-center p-5 z-0 text-white mt-10 flex flex-col">
        <h2 className="text-5xl font-bold">{heading}</h2>
        <p className="py-5 text-xl">{message}</p>
        <button className=" w-1/2 py-2 border rounded-2xl	">Gallery</button>
      </div>
    </div>
  );
};

export default Hero;
