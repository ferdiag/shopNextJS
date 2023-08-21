"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import { Store } from '../../context/mainContext'
import axios from 'axios'

const Shop = () => {
    const [arrayOfPictues, setArrayOfPictues] = useState([])
    const baseSrc = "http://192.168.0.149:4000/uploads/uploads/"
    const { state, dispatch } = useContext(Store)

    console.log(arrayOfPictues)
    useEffect(() => {
        (async () => {
            const res = await axios.get("/api/pics/getPic")
            const data = res.data
            if (data.result === "success") {
                setArrayOfPictues(data.arrayOfPictues)
            }
        })()
    }, [setArrayOfPictues])

    const displayArrayOfPictues = arrayOfPictues.map((pic, index) => {
        const src = baseSrc.concat("", pic.id).concat(".", pic.fileType)
        return <div key={index}><img src={src} alt="hallo welt" width={90} height={60} />
            <p>{pic.category}</p>
            <p>{pic.name}</p>
            <p>{pic.description}</p>
            <p>{pic.id}</p>
            <p>{pic.price}</p>
        </div >
    })
    return (
        <div>
            {
                arrayOfPictues.length === 0 ?
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