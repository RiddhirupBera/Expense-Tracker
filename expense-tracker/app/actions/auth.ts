"use server";

import User from "@/models/User";
import connectDB from "@/config/database";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function registerUser(formData: FormData) {
  try {
    await connectDB();

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // Validation
    if (!username || !password) {
      return { success: false, error: "Username and password are required" };
    }

    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters" };
    }

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return { success: false, error: "Username already exists" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    console.log("✅ User registered:", username);

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Registration failed" };
  }
}

export async function loginUser(formData: FormData) {
  try {
    await connectDB();

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      return { success: false, error: "Username and password are required" };
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return { success: false, error: "Invalid credentials" };
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, error: "Invalid credentials" };
    }

    // Create JWT
    const token = jwt.sign(
      { 
        id: user._id.toString(), 
        username: user.username 
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Set cookie
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    console.log("✅ User logged in:", username);
    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Login failed" };
  }
}

export async function logoutUser() {
  try {
    (await cookies()).delete("token");
    console.log("✅ User logged out");
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: "Logout failed" };
  }
}

export async function getCurrentUser() {
  try {
    const token = (await cookies()).get("token")?.value;
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    await connectDB();
    const user = await User.findById(decoded.id).select("-password");
    
    return {
      id: user._id.toString(),
      username: user.username,
    };
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}