import { NextResponse } from "next/server";
import { Picture } from "../../../../../models/picModel"
import { connect } from "../../../dbConfig/dbConfig"
import mongoose from "mongoose";

const GET = async (req) => {
    console.log("GET")
    const db = await connect()
    try {
        const pictures = await Picture.find({})

        const collection = await db.collection("pictures")
        const arrayOfPictues = await collection.find().toArray()
        const headers = req.headers;

        return NextResponse.json({
            result: "success"
            , message: "upload of photo was successful ",
            headers: headers,
            arrayOfPictues
        }, { status: 200 })

    } catch (err) {
    }

}

export { GET }