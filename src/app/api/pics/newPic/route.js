import { NextResponse } from "next/server"
import { connect } from "../../../dbConfig/dbConfig"
import { Picture } from "../../../models/picModel"

const POST = async (req, res) => {
    const db = await connect()
    const data = await req.json()

    try {
        new Picture(data).save()
    } catch (err) {
        return NextResponse.json({
            result: "error",
            message: "upload of photo was noct successful",
            dataOfNewPic: data,
            headers: headers
        }, { status: 200 })
    }
    const result = await Picture.findOne({ _id: data._id })
    const headers = req.headers;

    return NextResponse.json({
        result: "success",
        message: "upload of photo was successful ",
        dataOfNewPic: result,
        headers: headers
    }, { status: 200 })
}
export { POST }