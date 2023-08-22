"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Login from "@/components/login";

const Signup = () => {
  const pathname = usePathname();
  return (
    <div style={{ marginTop: "200px" }}>
      <Login pathname={pathname} />
    </div>
  );
};

export default Signup;
