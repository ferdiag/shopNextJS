"use client"
import axios from 'axios'
import React, { useState } from 'react'
import { uuidv4 } from '../../../../../utils/uuid4'

const AdminPage = () => {
    const [input, setInput] = useState({
        nameOfProduct: "",
        description: "",
        file: {}
    })
    const handelChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // file.name = "fileName"
            setInput(prevState => {
                return { ...prevState, file }
            })
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        const mimeType = input.file.type
        const fileType = mimeType.split(/[/ ]+/).pop();
        const data = new FormData();
        const id = uuidv4()
        data.append('file', input.file, "file");
        data.append('id', `${id}`);
        data.append('type', `${fileType}`);

        const payload = {
            name: input.nameOfProduct,
            description: input.description,
            id: id.toString(),
            fileType
        }

        try {
            await axios.post("http://192.168.0.149:4000/uploads", data).then(async (res) => {
                if (res.data.result === "success") {
                    console.log("pic saved")
                    await axios.post("/api/pics/newPic", payload).then((res) => {
                        if (res.data.result === "success") {
                            console.log(res.data.message)
                        }
                    })
                }
            });
        } catch (err) {
            throw new Error
        }
    }
    return (
        <div style={{ marginTop: "500px" }}>
            Admin
            <h3>neues Bild hochladen</h3>
            <label htmlFor='name'>Name</label>
            <input style={{ border: "1px solid black" }} type='text' name='name' id='name' value={input.nameOfProduct} onChange={e => setInput(prevState => {
                return { ...prevState, nameOfProduct: e.target.value }
            })}
            />
            <label htmlFor='description'>Beschreibung</label>
            <input style={{ border: "1px solid black" }} type='text' name='description' id='description' value={input.description} onChange={e => setInput(prevState => {
                return { ...prevState, description: e.target.value }
            })}
            />
            <label>Bilddatei</label>
            <input onChange={e => handelChange(e)} type='file' name="file" accept="image/png, Image/jpg" />
            <button onClick={handleUpload}>hochladen</button>
        </div>
    )
}

export default AdminPage