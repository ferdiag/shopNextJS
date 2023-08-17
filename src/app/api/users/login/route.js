import { NextResponse } from "next/server"

const POST = async (req, res) => {
    const reqBody = await req.json()
    const headers = req.headers;
    return NextResponse.json({
        message: "ich bin wider da",
        success: false,
        headers: headers
    })
}

export { POST }