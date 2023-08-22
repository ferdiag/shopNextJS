"use client"
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { uuidv4 } from '../../../../utils/uuid4'

const AdminPage = () => {
    const initValuesInput =
    {
        nameOfProduct: "",
        description: "",
        price: "",
        category: "",
        file: undefined
    }
    const baseSrc = "http://192.168.0.149:4000/uploads/uploads/"
    const [arrayOfPictues, setArrayOfPictues] = useState([])
    const [input, setInput] = useState(initValuesInput)





    useEffect(() => {
        (async () => {
            const res = await axios.get("/api/pics/getPic")
            const data = res.data
            if (data.result === "success") {
                setArrayOfPictues(data.arrayOfPictues)
            }
        })()
    }, [setArrayOfPictues])

    const handleDelete = async (e, i) => {

        const payload = {
            id: arrayOfPictues[i].id,
            fileType: arrayOfPictues[i].fileType
        }
        console.log(payload)
        await axios.post("http://192.168.0.149:4000/delete", payload).then(async (res) => {
            if (res.data.result === "success") {
                await axios.post("/api/pics/deletePic", { id: arrayOfPictues[i].id }).then((res) => {
                    setArrayOfPictues(currentArray => currentArray.filter(item => item.id != res.data.id))
                })
            }
        })
    }

    const handelChangeFileUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setInput(prevState => {
                return { ...prevState, file }
            })
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        console.log(input)
        if (input.nameOfProduct.length === 0 ||
            input.description.length === 0 ||
            input.price.length === 0 ||
            input.category.length === 0
        ) {
            console.log("Bitte alle Felder ausfüllen")
            return
        }

        if (!input.file) {
            console.log("du hast keine Datei hochgeladen")
            return
        }
        const mimeType = input.file.type
        const fileType = mimeType.split(/[/ ]+/).pop();
        const id = uuidv4()
        const price = parseFloat(input.price).toFixed(2)

        const data = new FormData();
        data.append('file', input.file, "file");
        data.append('id', `${id}`);
        data.append('type', `${fileType}`);
        data.append('price', `${price}`);

        //get all except file and merge it with id and fileType

        const { file, ...rest } = input
        console.log(rest)
        const payload = { ...rest, id, fileType }

        try {
            await axios.post("http://192.168.0.149:4000/uploads", data).then(async (res) => {
                if (res.data.result === "success") {
                    await axios.post("/api/pics/newPic", payload).then((res) => {
                        if (res.data.result === "success") {
                            setArrayOfPictues(currentArray => [...currentArray, res.data.dataOfNewPic])
                        }
                    })
                }
            });
        } catch (err) {
            throw new Error
        }
    }

    const DisplayArrayOfPictues = arrayOfPictues?.map((pic, index) => {
        const src = baseSrc.concat("", pic.id).concat(".", pic.fileType)
        return <div key={index}>
            <img src={src} alt="hallo welt" width={90} height={60} />
            <p>{pic.name}</p>
            <p>{pic.category}</p>
            <p>{pic.description}</p>
            <p>{pic.id}</p>
            <p>{pic.price}</p>
            <button onClick={(e) => handleDelete(e, index)}>X</button>
        </div>
    })

    return (
        <div style={{ marginTop: "300px" }}>
            Admin
            <h3>neues Bild hochladen</h3>
            <form onSubmit={handleUpload}>
                <label>Bilddatei</label>
                <input onChange={e => handelChangeFileUpload(e)} type='file' name="file" accept="image/png, Image/jpg" />

                <label htmlFor='name'>Name</label>
                <input style={{ border: "1px solid black" }} type='text' name='name' id='name' value={input.nameOfProduct} onChange={e => setInput(prevState => {
                    return { ...prevState, nameOfProduct: e.target.value }
                })}
                />
                <label htmlFor='category'>Kategorie</label>
                <input style={{ border: "1px solid black" }} type='text' name='category' id='category' value={input.category} onChange={e => setInput(prevState => {
                    return { ...prevState, category: e.target.value }
                })}
                />
                <label htmlFor='description'>Beschreibung</label>
                <input style={{ border: "1px solid black" }} type='text' name='description' id='description' value={input.description} onChange={e => setInput(prevState => {
                    return { ...prevState, description: e.target.value }
                })}
                />
                <label htmlFor='price'>Preis</label>
                <input style={{ border: "1px solid black" }} type='number' name='price' id='price' value={input.price} onChange={e => setInput(prevState => {
                    return { ...prevState, price: e.target.value }
                })} />
                <button onClick={handleUpload}>hochladen</button>
            </form>
            <div>{DisplayArrayOfPictues}</div>

        </div>
    )
}

export default AdminPage