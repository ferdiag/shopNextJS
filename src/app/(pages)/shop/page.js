"use client"
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Store } from '../../context/Store'
import { handleAddShoppingcard } from '../../handlers/handleAddShoppingcard'
import DisplayProducts from '../../../../components/displayArrays/DisplayProducts'
import { apiCallHandler } from '../../handlers/apiCalls/apicCallhandler'
import { getProductHandler } from "../../handlers/apiCalls/apiCallHandlers/getProductHandler"

const Shop = () => {
    const { state, dispatch } = useContext(Store)

    //there dependency array isnt set because the function should be executed once the page gets loaded.

    useMemo(() => {
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
    return (
        <div>
            {
                state.arrayOfProducts.length === 0 ?
                    <div>es gibt keine Bilder</div>
                    :
                    <DisplayProducts resource={state.resource} dispatch={dispatch} arrayOfProducts={state.arrayOfProducts} baseSrc={state.baseSrc} />
            }
        </div>
    )
}

export default Shop