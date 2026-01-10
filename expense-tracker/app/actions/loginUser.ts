"use server"
import User from "@/models/User";
import connectDB from "@/config/database";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function loginUser (formData : FormData){
    await connectDB();

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const userLogged = await User.findOne({"username" : username});
    console.log(userLogged.password, password);
    if(!userLogged){
        //return NextResponse.json({error: "User does not exist"}, {status: 400})
    }
    if(String(password)===String(userLogged.password)){
        console.log("Yes")
        redirect("/")
    }
    else{
        
    }

    let user = new User({
    //id: Date.now().toString(),
    username,
    password,
    date: new Date().toISOString().split("T")[0],
  })
  
  try {
    await user.save();
    console.log('User saved successfully!');
   }catch (err) {
    console.error(err);
   }
}