import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = ({ heading, message }) => {
  return (
    <section className="text-gray-600 body-font ">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col custom-image">
        <Image
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
          alt="hero"
          src="/background.jpg"
          width={640}
          height={420}
        />
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            {heading}{" "}
          </h1>
          <p className="mb-8 leading-relaxed">{message}</p>
          <div className="flex justify-center">
            <Link href={"/shop"}>
              <button  className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Shop
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
