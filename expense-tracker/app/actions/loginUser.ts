"use server"
import User from "@/models/User";
import connectDB from "@/config/database";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";


export async function loginUser (formData : FormData){
    await connectDB();

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const userLogged = await User.findOne({"username" : username});
    if(!userLogged){
        //return NextResponse.json({error: "User does not exist"}, {status: 400})
    }

    const isMatch = await bcrypt.compare(password, userLogged.password);

    if(isMatch){
        const cookieStore = await cookies();
        cookieStore.set("username", username, {
            httpOnly: true,
            path: "/",
        });
        redirect("/dashboard")
    }
    else{
            throw new Error("Invalid credentials");
    }

}