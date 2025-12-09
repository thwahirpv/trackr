"use server"

import connectToDatabase from "@/lib/db";
import { clearSession, getSession, setSession } from "@/lib/session";
import { userModel } from "@/model/User";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { AppError } from "@/lib/exceptions";


export const registerAction = async ({name, email, password, applicationGoal}) => {
    try {
        await connectToDatabase()
        const user = await userModel.findOne({email})
        if(user) {
            throw new AppError("Email already exists", 409, "email")
        }
        
        await userModel.create({
            name, 
            email,
            password,
            applicationGoal: Number(applicationGoal) || 50
        })

        return {
            status: true,
            message: "Registration Successful"
        }
    } catch (error) {
        return {
            status: false, 
            message: error.message || "Check your internet connection!",
            errorType: error.errorType
        }
    }
}


export const loginAction = async ({email, password}) => {
    try {
        await connectToDatabase()
    
        const user = await userModel.findOne({email})
        if(!user) {
            throw new AppError("Invalid Email", 401, "email")
        }
        
        const isMatch = await user.comparePassword(password)
        if(!isMatch) {
            throw new AppError("Invalid Password", 401, "password")
        }

        await setSession({name: user.name, email: user.email, id: user._id, applicationGoal: user.applicationGoal || 50})
        revalidatePath("/");
        return {
            status: true,
            message: "Login Successful",
            user: {
                email: user.email,
                name: user.name
            }
        }
    } catch (error) {
        return {
            status: false, 
            message: error.message || "Check your internet connection!",
            errorType: error.errorType
        }
    } 
}


export const logOutAction = async () => {
    await clearSession()
    redirect("/login")
}

export const updateUserGoal = async (goal) => {
    const session = await getSession();
    if(!session) {
        await clearSession();
        redirect("/login");
    }

    try {
        await connectToDatabase();
        
        await userModel.findByIdAndUpdate(session.id, {
            applicationGoal: Number(goal)
        });

        revalidatePath("/"); 
        return { status: true, message: "Goal Updated" };
    } catch (error) {
        return { status: false, message: error.message };
    }
}
