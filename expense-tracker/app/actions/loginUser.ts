"use server"
import User from "@/models/User";
import connectDB from "@/config/database";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


export async function loginUser (formData : FormData){
    await connectDB();

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const userLogged = await User.findOne({"username" : username});
    if(!userLogged){
        //return NextResponse.json({error: "User does not exist"}, {status: 400})
    }
    if(String(password)===String(userLogged.password)){
        const cookieStore = await cookies();
        cookieStore.set("username", username, {
            httpOnly: true,
            path: "/",
        });
        redirect("/dashboard")
    }
    else{
        
    }

}