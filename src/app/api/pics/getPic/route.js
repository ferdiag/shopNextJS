import { NextResponse } from "next/server";
import { connect } from "../../../dbConfig/dbConfig"
import mongoose from "mongoose";
import { Picture } from "../../../models/picModel"

const GET = async (req) => {
    const db = await connect()
    try {
        const pictures = await Picture.find({})

        const collection = await db.collection("pictures")
        const arrayOfPictures = await collection.find().toArray()
        const headers = req.headers;
        console.log(arrayOfPictures)
        return NextResponse.json({
            result: "success",
            message: "upload of photo was successful ",
            headers: headers,
            arrayOfPictures
        }, { status: 200 })

    } catch (err) {
    }
}

export { GET }