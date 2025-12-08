import connectToDatabase from "@/lib/db";
import { jobModel } from "@/model/Job";
import { NextResponse } from "next/server";
import { clearSession, getSession } from "@/lib/session";

export const GET = async (req) => {
    try {
        const user = await getSession();
        if (!user) {
            return new NextResponse(JSON.stringify({
                statusCode: 401,
                status: false,
                data: "Unauthorized"
            }), { status: 401 });
        }

        await connectToDatabase();
        
        // Basic filtering capability
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');
        
        let query = { userId: user.id };
        if (status && status !== 'All') {
            query.status = status;
        }

        const jobs = await jobModel.find(query).sort({ createdAt: -1 });

        return new NextResponse(JSON.stringify({
            statusCode: 200,
            status: true,
            data: jobs
        }));
    } catch (error) {
        return new NextResponse(JSON.stringify({
            statusCode: 500,
            status: false,
            data: error.message || "Internal Server Error"
        }), { status: 500 });
    }
}

export const POST = async (req) => {
    try {
        const user = await getSession();
        if (!user) {
            return new NextResponse(JSON.stringify({
                statusCode: 401,
                status: false,
                data: "Unauthorized"
            }), { status: 401 });
        }

        await connectToDatabase();
        const body = await req.json();

        // Validate required fields
        if (!body.company || !body.position) {
             return new NextResponse(JSON.stringify({
                statusCode: 400,
                status: false,
                data: "Company and Position are required."
            }), { status: 400 });
        }

        const newJob = await jobModel.create({
            ...body,
            userId: user.id
        });

        return new NextResponse(JSON.stringify({
            statusCode: 201,
            status: true,
            data: newJob
        }), { status: 201 });

    } catch (error) {
        return new NextResponse(JSON.stringify({
            statusCode: 500,
            status: false,
            data: error.message || "Internal Server Error"
        }), { status: 500 });
    }
}
