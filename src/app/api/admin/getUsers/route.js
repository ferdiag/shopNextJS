import { User } from "../../../models/userModel"
import { connect } from "../../../dbConfig/dbConfig"
import { NextResponse } from "next/server";

const GET = async (req) => {
    const headers = req.headers;
    const db = await connect()

    try {
        const collection = await db.collection("users")
        const users = await collection.find().toArray()
        const usersWithoutPassword = users.map(user => {
            const { password, ...rest } = user
            return rest
        })
        const response = NextResponse.json({
            result: "success",
            message: "upload of photo was successful ",
            users: usersWithoutPassword,
            headers: headers,
        }, { status: 200 })
        return response
    } catch (err) {
    }
    const response = NextResponse.json({
        result: "error",
        message: "upload of photo was successful ",
        users: usersWithoutPassword,
        headers: headers,
    }, { status: 401 })
    return response
}
export { GET }