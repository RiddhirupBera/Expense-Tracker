import User from "@/models/User";
import connectDB from "@/config/database";

export async function addUser (formData : FormData){
    await connectDB();

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

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