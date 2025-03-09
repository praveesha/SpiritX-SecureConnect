"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "../../services/api";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await signUp(formData);
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => router.push("/signin"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center rounded-xl h-[500px] w-[500px] bg-gradient-to-r from-blue-200 to-blue-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
            SIGN UP
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account? <a href="/signin" className="text-blue-500">Sign in</a>
        </p>
      </div>
    </div>
  );
}
