"use client"

import Link from "next/link"

export default function SideNavBar(){
    return(
        <div className="sideNav">
            <div className="sideNavComps">
            <Link href="/pages/dashboard">Dashboard</Link>
            <Link href="/pages/add">Add Expense</Link>
            <Link href="/pages/expense-list">View Expenses</Link>
            </div>
        </div>
    )
}