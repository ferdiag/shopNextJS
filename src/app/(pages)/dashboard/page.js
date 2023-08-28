"use client"
import React, { useState, useContext, useEffect } from 'react'
import { Store } from '../../context/Store'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Dashboard = () => {
    const { state, dispatch } = useContext(Store)
    const router = useRouter()
    const [isAdmin, setIsAdmin] = useState(false)


    console.log(state.userData)
    return (
        <div style={{ marginTop: "100px" }}>
            <div>
                hallo
                <h1>
                    {state.userData.username}
                </h1>
                {state.userData.email === "ferdiag@yahoo.de" && <button onClick={() => router.push("/dashboard/admin")}>adminPage</button>}
            </div>
        </div>
    )
}

export default Dashboard