"use client"
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Store } from '../../context/Store'
import { handleAddShoppingcard } from '../../handlers/handleAddShoppingcard'
import DisplayProducts from '../../../../components/displayArrays/DisplayProducts'
import { apiCallHandler } from '../../handlers/apiCalls/apicCallhandler'
import { getProductHandler } from "../../handlers/apiCalls/apiCallHandlers/getProductHandler"
import DisplayTypes from "../../../../components/displayArrays/DisplayTypes"
import { useSearchParams } from 'next/navigation'
const Shop = () => {
    const { state, dispatch } = useContext(Store)
    const { arrayOfProducts, resource, baseSrc } = state
    const [shownProducts, setShownProducts] = useState(arrayOfProducts);
    const searchParams = useSearchParams();

    useEffect(() => {
        const hasParams = searchParams.toString().length > 0

        if (hasParams) {
            const searchParamsString = searchParams.toString();
            const extractingVal = searchParamsString.split("=")[1];


            const filteredProducts = arrayOfProducts.filter(
                ({ category }) => category === extractingVal
            );
            const newArrayProducts =
                extractingVal === "all+Products" ? arrayOfProducts : filteredProducts;
            setShownProducts(newArrayProducts);
        }
    }, [setShownProducts, arrayOfProducts, searchParams])
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

    return (
        <section>
            {
                state.arrayOfProducts?.length === 0 ?
                    <div>es gibt keine Bilder</div>

                    : <>
                        <DisplayTypes shownProducts={shownProducts} setShownProducts={setShownProducts} arrayOfProducts={arrayOfProducts} />
                        <DisplayProducts shownProducts={shownProducts} resource={resource} dispatch={dispatch} arrayOfProducts={state.arrayOfProducts} baseSrc={baseSrc} />
                    </>
            }


        </section>
    )
}

export default Shop