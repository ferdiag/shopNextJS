import { NextResponse } from "next/server"

const middleware = async (req) => {
    // console.log("middleware", req.nextUrl.pathname)
    const path = req.nextUrl.pathname
    const token = req.cookies.get("token")?.value || ""
    const privateRoute = path === "/dashboard" || path === "/dashboard/admin" || path === "/api/admin/getUsers"

    if (privateRoute && !token) {
        const newUrl = `${req.nextUrl.origin}/login`
        return NextResponse.redirect(new URL(newUrl))
    }
}
export { middleware }