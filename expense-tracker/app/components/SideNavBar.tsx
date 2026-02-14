"use client"

import Link from "next/link"

export default function SideNavBar(){
    return(
        <div className="sideNav">
            <div className="sideNavComps">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/add">Add Expense</Link>
            <Link href="/filter">Filter Expenses</Link>
            <Link href="/expense-list">View Expenses</Link>
            <Link href="/lended">Lended Expenses</Link>
            </div>
        </div>
    )
}