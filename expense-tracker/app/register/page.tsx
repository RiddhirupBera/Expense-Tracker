"use client";

import { addUser } from "@/app/actions/addUser";
import { redirect } from "next/navigation";
import { checkLoggedIn } from "@/app/actions/checkLoggedIn";
import { useEffect } from "react";

export default function Register() {

  useEffect(()=>{
    checkLoggedIn();
  },[])
  
  return (
    <>
    <div className="basic-container">
    <form action={addUser}>
      <input
        name="username"
        placeholder="Username"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
      />

      <button type="submit">Register</button>
    </form>
    <button onClick={()=>{redirect("/login")}}>Login</button>
    </div>
    </>
  );
}
