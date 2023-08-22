import { NextResponse } from "next/server"
import { connect } from "../../../dbConfig/dbConfig"
import { Picture } from "../../../models/picModel"

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
    const col = await db.collection("pictures")
    const pics = await col.find({}).toArray()
    console.log(pics)
    return NextResponse.json({
        result: "success",
        message: "upload of photo was successful ",
        dataOfNewPic: data,
        headers: headers
    }, { status: 200 })

}
export { POST }