import { NextResponse } from "next/server";
import { connect } from "../../../dbConfig/dbConfig"
import { Picture } from "../../../models/picModel"

const GET = async (req) => {
    const db = await connect()
    try {
        const pictures = await Picture.find({})
        const headers = req.headers;

        return NextResponse.json({
            result: "success",
            message: "upload of photo was successful ",
            headers: headers,
            arrayOfProducts: pictures
        }, { status: 200 })

    } catch (err) {
    }
}

export { GET }