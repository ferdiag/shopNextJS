"use client";

import React, { useState, useContext } from "react";
import { Store } from "../../../context/Store";
import { useRouter } from "next/navigation";

const UserProfil = (params) => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  console.log(state.userData);
  return (
    <div style={{ marginTop: "100px" }}>
      <div>
        hallo
        <h1>{state.userData.username}</h1>
        {state.userData.email === "ferdiag@yahoo.de" && (
          <button onClick={() => router.push("/dashboard/admin")}>
            adminPage
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfil;
