"use client";
import Image from "next/image";
import React from "react";

const Gallery = () => {
  return (
    <div>
      <img
        src="http://192.168.0.149:4000/uploads/uploads/5be29371-eea2-4df5-bfac-70e13fff5ad4.jpeg"
        alt="Picture of the author"
        width={500}
        height={500}
      />
    </div>
  );
};

export default Gallery;
