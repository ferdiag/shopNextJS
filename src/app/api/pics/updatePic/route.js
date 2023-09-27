import { NextResponse } from "next/server"
import { connect } from "../../../dbConfig/dbConfig"
import { Picture } from "../../../models/picModel"

const POST = async (req) => {

    const db = await connect()
    const collection = await db.collection("pictures")

    const headers = req.headers;

    const data = await req.json()
    console.log("data", data)
    try {
        const query = { id: data.id }
        const res = await collection.findOne(query)
        console.log("mongoDB result", res)
        if (res) {
            const headers = req.headers;
            return NextResponse.json({
                result: "success"
                , message: "update successful",
                id: data.id,
                headers: headers
            }, { status: 200 })
        }
        //     return NextResponse.json({
        //         result: "error"
        //         , message: "upload of photo was not successful ",
        //         headers: headers
        //     }, { status: 400 })
    } catch (err) {
        return NextResponse.json({
            result: "error"
            , message: "upload of photo was not successful ",
            headers: headers
        }, { status: 400 })

    }

}
export { POST }