"use server"
import connectDB from "@/config/database";
import { getCurrentUser } from "./auth";
import User from "@/models/User";

export default async function GetUser(){
    await connectDB();

    const user = await getCurrentUser();
  
    if (!user) {
        return null;
    }

    const userDetails = await User.findOne({ username: user.username }).lean();
    
    if (!userDetails) {
        return null;
    }

    return {
        _id: userDetails._id.toString(),
        username: userDetails.username,
        borrowedExpenses: userDetails.borrowedExpenses?.map((exp: any) => ({
            expenseId: exp.expenseId?.toString(),
            expenseName: exp.expenseName,
            amount: exp.amount,
            lender: exp.lender,
            isPaid: exp.isPaid || false,
            paidAt: exp.paidAt ? exp.paidAt.toISOString() : undefined
        })) || [],
        lendedExpenses: userDetails.lendedExpenses?.map((exp: any) => ({
            expenseId: exp.expenseId?.toString(),
            expenseName: exp.expenseName,
            amount: exp.amount,
            borrowers: exp.borrowers?.map((b: any) => ({
                username: b.username,
                amount: b.amount,
                isPaid: b.isPaid || false,
                paidAt: b.paidAt ? b.paidAt.toISOString() : undefined
            })) || []
        })) || []
    };
}