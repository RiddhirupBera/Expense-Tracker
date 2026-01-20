"use client";

import Link from "next/link";
import { logoutUser } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

interface NavProps {
  username: string;
}

export default function NavLinks({ username }: NavProps) {
  const router = useRouter();

  async function handleLogout() {
    await logoutUser();
    window.location.href = "/login"; // Full page reload
  }

  return (
    <div style={styles.links}>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/add">Add Expense</Link>
      <Link href="/expense-list">Expense List</Link>
      <span>Hi, {username}</span>
      <button 
        onClick={handleLogout}
        style={styles.logoutBtn}
      >
        Logout
      </button>
    </div>
  );
}

const styles = {
  links: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  logoutBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  }
};