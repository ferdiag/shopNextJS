import { NextResponse } from "next/server"
import { connect } from "../../../dbConfig/dbConfig"
import { Picture } from "../../../../../models/picModel"
import mongoose from "mongoose"

const POST = async (req, res) => {
    const db = await connect()
    const data = await req.json()
    try {
        new Picture({
            name: data.name,
            description: data.description,
            id: data.id,
            fileType: data.fileType
        }).save()
    } catch (err) {
        console.log(err)
    }
    const headers = req.headers;

    return NextResponse.json({
        result: "success"
        , message: "upload of photo was successful ",
        headers: headers
    }, { status: 200 })

}
export { POST }