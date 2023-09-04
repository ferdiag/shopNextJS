"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Form from "../../../../components/Form";

const Login = () => {
  const pathname = usePathname();
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Melde dich mit deiner E-Mail und deinem Passwort an
          </h1>
          {/* <p className="leading-relaxed mt-4">
            Poke slow-carb mixtape knausgaard, typewriter street art gentrify
            hammock starladder roathse. Craies vegan tousled etsy austin.
          </p> */}
        </div>
        <Form pathname={pathname} />
      </div>
      <div></div>
    </section>
  );
};

export default Login;
