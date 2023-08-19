"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import { Store } from '../../context/mainContext'
import axios from 'axios'


const Shop = () => {
    const [arrayOfPictues, setArrayOfPictues] = useState([])
    const baseSrc = "http://192.168.0.149:4000/uploads/uploads/"
    console.log(arrayOfPictues)
    useEffect(() => {
        (async () => {
            const res = await axios.get("/api/pics/getPic")
            const data = res.data
            if (data.result === "success") {
                setArrayOfPictues(data.arrayOfPictues)
            }
        })()
        // fetchData()
    }, [setArrayOfPictues])

    const displayArrayOfPictues = arrayOfPictues.map((pic, index) => {
        const src = baseSrc.concat("", pic.id).concat(".", pic.fileType)
        console.log(src)
        return <div key={index}><img src={src} alt="hallo welt" /></div>
    })
    // const { state, dispatch } = useContext(Store)
    return (
        <div>
            {arrayOfPictues.length === 0 &&
                <div>es gibt keine Bilder</div>
            }
            {displayArrayOfPictues}
        </div>
    )
}

export default Shop