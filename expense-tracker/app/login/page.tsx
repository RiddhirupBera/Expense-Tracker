"use client"

import { loginUser } from "@/app/actions/loginUser"
import { addUser } from "@/app/actions/addUser"
export default function Login (){
    return(
        <>
        <div className="basic-container">
        <form action={loginUser}>
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
        
              <button type="submit">Login</button>
            </form>
            </div>
        </>    
    )
}