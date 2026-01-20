"use client";

import { registerUser } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await registerUser(formData);

      if (result.success) {
        router.push("/login");
      } else {
        setError(result.error || "Registration failed");
      }
    });
  }

  return (
    <div className="basic-container">
      <h2>Register</h2>
      
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
          placeholder="Password (min 6 characters)"
          required
          disabled={isPending}
          autoComplete="new-password"
          minLength={6}
        />

        <button type="submit" disabled={isPending}>
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
}