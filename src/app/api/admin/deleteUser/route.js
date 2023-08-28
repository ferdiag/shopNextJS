import { connect } from "../../../dbConfig/dbConfig"
import { NextResponse } from "next/server";
import { ObjectId } from "mongoose"
import { User } from "../../../models/userModel";
const POST = async (req) => {
    const headers = req.headers;
    console.log("delete user")
    const db = await connect();
    const data = await req.json();
    connect()
    try {
        const result = await User.deleteOne({ _id: data._id })

        if (result.acknowledged === true) {
            return NextResponse.json(
                {
                    result: "success",
                    message: "der User wurde entfernt",
                    id: data._id,
                    headers: headers,
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    result: "error",
                    message: "der User wurde nicht entfernt",
                    id,
                    headers: headers,
                },
                { status: 200 }
            );
        }
    } catch (err) {
        console.log(err);
    }
};
export { POST };