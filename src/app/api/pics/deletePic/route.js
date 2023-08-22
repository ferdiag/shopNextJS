import { NextResponse } from "next/server"
import { connect } from "../../../dbConfig/dbConfig"
import mongoose from "mongoose"

const POST = async (req) => {
    const db = await connect()
    const collection = await db.collection("pictures")
    const headers = req.headers;

    const data = await req.json()
    console.log(data.id)
    try {
        const quey = { id: data.id }
        const res = await collection.deleteOne(quey)

        if (res.deletedCount > 0) {
            const headers = req.headers;
            return NextResponse.json({
                result: "success"
                , message: "deleted photo",
                id: data.id,
                headers: headers
            }, { status: 200 })
        }
        return NextResponse.json({
            result: "error"
            , message: "upload of photo was not successful ",
            headers: headers
        }, { status: 400 })
    } catch (err) {
        return NextResponse.json({
            result: "error"
            , message: "upload of photo was not successful ",
            headers: headers
        }, { status: 400 })

    }
}
export { POST }