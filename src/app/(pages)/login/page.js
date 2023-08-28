"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Form from "../../../../components/Form";

const Login = () => {
    const pathname = usePathname();
    return (
        <div style={{ marginTop: "200px" }}>
            <Form pathname={pathname} />
        </div>
    );
};

export default Login;