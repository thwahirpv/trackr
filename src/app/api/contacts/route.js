import connectToDatabase from "@/lib/db";
import { contactModel } from "@/model/Contact";
import { NextResponse } from "next/server";
import { clearSession, getSession } from "@/lib/session";
import { redirect } from "next/navigation";



export const GET = async (req) => {
    console.log("GETTING CONTACTS")
    const user = await getSession()
    console.log("Current user:", user)
    if(!user) {
        clearSession()
        return new NextResponse(JSON.stringify({
            statusCode: 401,
            status: false,
            data: "Unauthorized"
        }))
    }
    
    try {
        await connectToDatabase()
        const contacts = await contactModel.find({userId:user?.id})
        return new NextResponse(JSON.stringify({
            statusCode: 200, 
            status: true, 
            data: contacts
        }))
    } 
    catch (error) {
        return new NextResponse(JSON.stringify({
            statusCode: 500, 
            status: false,
            data: error.message || "Check your internet connection!"
        }))
    }
}


export const POST = async (req) => {
    console.log("POSTING CONTACT")
    const user = await getSession()
    console.log("User: ",user)
    if(!user) {
        console.log("User not found")
        clearSession()
        return new NextResponse(JSON.stringify({
            statusCode: 401,
            status: false,
            data: "Unauthorized"
        }))
    }

    try {
        await connectToDatabase()
        const contactData = await req.json()
        console.log("Contact Data: ",contactData, user)
        const isExist = await contactModel.findOne({phone:contactData.phone, userId: user.id})

        if(isExist) {
            return new NextResponse(JSON.stringify({
                statusCode: 409,
                status: false,
                data: "Contact already exist!"
            }))
        }

        const contact = await contactModel.create({
            email: contactData.email,
            phone: contactData.phone,
            name: contactData.name,
            userId: user.id
        })
        return new NextResponse(JSON.stringify({
            statusCode: 201,
            status: true,
            data: contact
        }))
    }
    catch (error) {
        return new NextResponse(JSON.stringify({
            statusCode: 500,
            status: false,
            data: error.message || "Check your internet connection!"
        })) 
    }
}

