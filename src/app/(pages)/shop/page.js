"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../../context/Store'
import { handleAddShoppingcard } from '../../handlers/handleAddShoppingcard'
import DisplayProducts from '../../../../components/displayArrays/DisplayProducts'
import { apiCallHandler } from '../../handlers/apiCalls/apicCallhandler'
import { getProductHandler } from "../../handlers/apiCalls/apiCallHandlers/getProductHandler"

const Shop = () => {
    const { state, dispatch } = useContext(Store)

    //there dependency array isnt set because the function should be executed once the page gets loaded.

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
    console.log(state.arrayOfPictures)
    return (
        <div>
            {
                state.arrayOfPictures.length === 0 ?
                    <div>es gibt keine Bilder</div>
                    :
                    <DisplayProducts resource={state.resource} dispatch={dispatch} arrayOfPictures={state.arrayOfPictures} baseSrc={state.baseSrc} />
            }
        </div>
    )
}

export default Shop