"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../../context/Store'
import { handleAddShoppingcard } from '../../handlers/handleAddShoppingcard'
import DisplayProducts from '../../../../components/displayArrays/DisplayProducts'
import { apiCallHandler } from '../../handlers/apiCalls/apicCallhandler'
import { getProductHandler } from "../../handlers/apiCalls/apiCallHandlers/getProductHandler"

const Shop = () => {
    const { state, dispatch } = useContext(Store)

    useEffect(() => {
        (async () => {
            const props = {
                endpoint: "pics/getPic",
                apiCall: getProductHandler,
                state,
                dispatch,
                method: "get"
            }
            await apiCallHandler(props)

        })()
    }, [])

    // const displayArrayOfPictures = state.arrayOfPictures.map((pic, index) => {
    //     const src = baseSrc.concat("", pic.id).concat(".", pic.fileType)

    //     return <div key={index}><img src={src} alt="hallo welt" width={90} height={60} />
    //         <p>{pic.category}</p>
    //         <p>{pic.name}</p>
    //         <p>{pic.description}</p>
    //         <p>{pic.id}</p>
    //         <p>{pic.price}</p>
    //         <button onClick={e => handleAddShoppingcard(e, index, state, dispatch)}>zum Warenkorb hinzufügen</button>
    //     </div >
    // })
    return (
        <div>
            {
                state.arrayOfPictures.length === 0 ?
                    <div>es gibt keine Bilder</div>
                    :
                    <div>
                        <DisplayProducts resource={state.resource} dispatch={dispatch} arrayOfPictures={state.arrayOfPictures} baseSrc={state.baseSrc} />
                    </div>
            }
        </div>
    )
}

export default Shop