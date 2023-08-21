import { NextResponse } from "next/server"
import { connect } from "../../../dbConfig/dbConfig"
import { Picture } from "../../../../../models/picModel"
import mongoose from "mongoose"

const POST = async (req, res) => {
    const db = await connect()
    const data = await req.json()
    try {
        new Picture(
            data
        ).save()

    } catch (err) {
        console.log(err)
    }
    const headers = req.headers;

    return NextResponse.json({
        result: "success",
        message: "upload of photo was successful ",
        dataOfNewPic: data,
        headers: headers
    }, { status: 200 })

}
export { POST }