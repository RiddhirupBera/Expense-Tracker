"use server"
import Expense from "@/models/Expense";
import connectDB from "@/config/database";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getExpenses() {
  await connectDB();

  const cookieStore = await cookies();   
  const username = cookieStore.get("username")?.value;
  if (!username) {
    redirect("/login");
  }
  
  const expenses = await Expense.find({"username" : username}).lean();
  console.log(expenses, username)
  return expenses;
}
