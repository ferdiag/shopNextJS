import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { connect } from "../../../dbConfig/dbConfig";

const jwt = require('jsonwebtoken');

const POST = async (req, res) => {
    const headers = req.headers;
    const db = await connect();
    const data = await req.json();
    try {
        const userCollection = await db.collection("users");
        const user = await userCollection.findOne({ email: data.email });

        const { password, ...rest } = user

        const isPasswordValid = await bcrypt.compare(data.password, password)
        if (isPasswordValid) {
            const token = jwt.sign({ id: rest._id }, "hallo welt", { expiresIn: "1h" })

            const response = NextResponse.json({
                result: "success",
                message: "User login successful",
                headers: headers,
                pathname: data.pathname,
                user: rest,
            }, { status: 200 })
            response.cookies.set("token", token, {
                httpOnly: true
            })
            return response
        }
    } catch (err) {
        console.log("loginError", err)
        return NextResponse.json({
            result: "error",
            message: "Login gescheitert",
            headers: headers,
        }, { status: 200 })
    }
}

export { POST }