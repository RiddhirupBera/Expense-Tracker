"use server";

import { expenses } from "@/lib/expenses";
import  Expense  from "@/models/Expense";
import connectDB from  "@/config/database";
import { cookies } from "next/headers";


export async function addExpense(formData: FormData) {

  await connectDB();  

  const title = formData.get("title") as string;
  const amount = Number(formData.get("amount"));
  const category = formData.get("category") as string;
  const date = formData.get("date");


  const cookieStore = await cookies();   
  const username = cookieStore.get("username")?.value;
  
  let expense = new Expense({
    username,
    name : title,
    amount, 
    category,
    date,
  })
  
  try {
    await expense.save();
    console.log('User saved successfully!');
   }catch (err) {
    console.error(err);
   }


}
