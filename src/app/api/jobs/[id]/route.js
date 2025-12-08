import connectToDatabase from "@/lib/db";
import { jobModel } from "@/model/Job";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export const PUT = async (req, { params }) => {
    try {
        const user = await getSession();
        if (!user) {
            return new NextResponse(JSON.stringify({
                statusCode: 401,
                status: false,
                data: "Unauthorized"
            }), { status: 401 });
        }

        const { id } = await params;
        await connectToDatabase();
        const body = await req.json();

        const updatedJob = await jobModel.findOneAndUpdate(
            { _id: id, userId: user.id },
            { $set: body },
            { new: true }
        );

        if (!updatedJob) {
             return new NextResponse(JSON.stringify({
                statusCode: 404,
                status: false,
                data: "Job not found or unauthorized"
            }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({
            statusCode: 200,
            status: true,
            data: updatedJob
        }));

    } catch (error) {
        return new NextResponse(JSON.stringify({
            statusCode: 500,
            status: false,
            data: error.message || "Internal Server Error"
        }), { status: 500 });
    }
}

export const DELETE = async (req, { params }) => {
    try {
        const user = await getSession();
        if (!user) {
            return new NextResponse(JSON.stringify({
                statusCode: 401,
                status: false,
                data: "Unauthorized"
            }), { status: 401 });
        }

        const { id } = await params;
        await connectToDatabase();

        const deletedJob = await jobModel.findOneAndDelete({ _id: id, userId: user.id });

        if (!deletedJob) {
            return new NextResponse(JSON.stringify({
                statusCode: 404,
                status: false,
                data: "Job not found or unauthorized"
            }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({
            statusCode: 200,
            status: true,
            data: "Job deleted successfully"
        }));

    } catch (error) {
        return new NextResponse(JSON.stringify({
            statusCode: 500,
            status: false,
            data: error.message || "Internal Server Error"
        }), { status: 500 });
    }
}
