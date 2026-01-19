"use server"
import User from "@/models/User";
import connectDB from "@/config/database";
import bcrypt from "bcryptjs";


export async function addUser (formData : FormData){
    await connectDB();

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = new User({
    username,
    password : hashedPassword
    })
  
  try {
    await user.save();
    console.log('User saved successfully!');
   }catch (err) {
    console.error(err);
   }
}