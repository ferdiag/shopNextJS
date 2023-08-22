"use client"
import React, { useContext, useEffect, useState } from 'react'

import axios from 'axios'
import { Store } from '../../context/Store'
import { handleAddShoppingcard } from '../../handlers/handleAddShoppingcard'

const Shop = () => {
    const baseSrc = "http://192.168.0.149:4000/uploads/uploads/"
    const { state, dispatch } = useContext(Store)

    useEffect(() => {
        (async () => {
            const res = await axios.get("/api/pics/getPic")
            const data = res.data
            if (data.result === "success") {
                dispatch({
                    type: "SET_ARRAY_OF_PICTURES",
                    payload: data.arrayOfPictues,
                });
            }
        })()
    }, [dispatch])


    const displayArrayOfPictues = state.arrayOfPictues.map((pic, index) => {
        const src = baseSrc.concat("", pic.id).concat(".", pic.fileType)

        return <div key={index}><img src={src} alt="hallo welt" width={90} height={60} />
            <p>{pic.category}</p>
            <p>{pic.name}</p>
            <p>{pic.description}</p>
            <p>{pic.id}</p>
            <p>{pic.price}</p>
            <button onClick={e => handleAddShoppingcard(e, index, state, dispatch)}>zum Warenkorb hinzufügen</button>
        </div >
    })
    return (
        <div>
            {
                state.arrayOfPictues.length === 0 ?
                    <div>es gibt keine Bilder</div>
                    :
                    <div>
                        {displayArrayOfPictues}
                    </div>
            }
        </div>
    )
}

export default Shop