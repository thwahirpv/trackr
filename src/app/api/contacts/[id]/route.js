import connectToDatabase from "@/lib/db";
import { contactModel } from "@/model/Contact";
import { clearSession, getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
    console.log("REACHED DELETE")
    console.log("params:", params)
    const user = await getSession()
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
        
        const { id } = await params 
        const deletedContact = await contactModel.findByIdAndDelete({_id: id, userId: user.id})
        if(!deletedContact) {
            return new NextResponse(JSON.stringify({
                statusCode: 404,
                status: false,
                data: "Contact not found"
            }))
        }
        return new NextResponse(JSON.stringify({
            statusCode: 200,
            status: true,
            data: deletedContact
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

export const PUT = async (req, { params }) => {
    console.log("REACHED PUT")
    
    const user = await getSession()
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
        
        const { id } = await params 
        const contactDetails = await req.json()
        const updatedContact = await contactModel.findOneAndUpdate({_id: id, userId: user.id}, { 
            name: contactDetails.name,
            email: contactDetails.email,
            phone: contactDetails.phone
        }, { new: true })
        
        if(updatedContact) {
            return new NextResponse(JSON.stringify({
                statusCode: 200,
                status: true,
                data: updatedContact
            }))
        }
        return new NextResponse(JSON.stringify({
            statusCode: 404,
            status: false,
            data: "Contact not found"
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
