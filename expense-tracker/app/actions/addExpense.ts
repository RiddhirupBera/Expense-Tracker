"use server";

import { expenses } from "@/lib/expenses";
import { revalidatePath } from "next/cache";
import  Expense  from "@/models/Expense";
import connectDB from  "@/config/database";
import { cookies } from "next/headers";


export async function addExpense(formData: FormData) {

  await connectDB();  

  const title = formData.get("title") as string;
  const amount = Number(formData.get("amount"));
  const category = formData.get("category") as string;

  expenses.push({
    id: Date.now().toString(),
    title,
    amount, 
    category,
    date: new Date().toISOString().split("T")[0],
  });

  const cookieStore = await cookies();   
  const username = cookieStore.get("username")?.value;
  
  let expense = new Expense({
    username,
    name : title,
    amount, 
    category,
    date: new Date().toISOString().split("T")[0],
  })
  
  try {
    await expense.save();
    console.log('User saved successfully!');
   }catch (err) {
    console.error(err);
   }

    revalidatePath("/expense");

}
