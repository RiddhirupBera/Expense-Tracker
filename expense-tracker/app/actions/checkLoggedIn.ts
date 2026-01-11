"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export  async function checkLoggedIn () {
    const cookieStore = await cookies();   
    const username = cookieStore.get("username")?.value;

    if(username){
        redirect("/pages/dashboard");
    }
}