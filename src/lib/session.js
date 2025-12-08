import { cookies } from "next/headers";


export const setSession = async (user) => {
    const cookieStore = await cookies();
    cookieStore.set("session", JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    })
}

export const getSession = async () => {
    const cookieStore = await cookies();
    const session = await cookieStore.get("session")?.value
    if(!session) return null
    const user = JSON.parse(session)
    return user
}


export const clearSession = async () => {
    console.log("going to delete the cookie")
    const cookiesStore = await cookies()
    cookiesStore.delete("session")
}