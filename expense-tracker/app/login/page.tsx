"use client";

import { loginUser } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await loginUser(formData);

      if (result.success) {
        // Use window.location for full page reload to ensure cookies are sent
        window.location.href = "/dashboard";
      } else {
        setError(result.error || "Login failed");
      }
    });
  }

  return (
    <div className="basic-container">
      <h2>Login</h2>
      
      {error && (
        <div style={{ 
          color: "red", 
          padding: "10px", 
          marginBottom: "10px",
          border: "1px solid red",
          borderRadius: "4px"
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          required
          disabled={isPending}
          autoComplete="username"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          disabled={isPending}
          autoComplete="current-password"
        />

        <button type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        Don't have an account? <Link href="/register">Register</Link>
      </p>
    </div>
  );
}