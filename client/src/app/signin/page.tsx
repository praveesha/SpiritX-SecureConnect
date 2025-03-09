"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../../services/api";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ Success Message
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(""); // ✅ Clear previous messages

    try {
      console.log("Sending SignIn Request:", formData);
      const response = await signIn(formData);
      console.log("SignIn Success:", response.data);
      localStorage.setItem("token", response.data.token);

      setSuccess("✅ Login Successful! Redirecting..."); // ✅ Success Message with Green Checkmark

      setTimeout(() => {
        router.push("/profile");
      }, 2000); // ✅ Redirect after delay for smooth transition
    } catch (err: any) {
      console.error("SignIn Error:", err.response?.data?.error || err.message);
      setError(err.response?.data?.error || "Invalid username or password");
    }
  };

  return (
    <div className="flex justify-center items-center rounded-xl h-[500px] w-[500px] bg-gradient-to-r from-blue-400 to-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
        
        {/* ✅ Display error message in red */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        
        {/* ✅ Display success message in green */}
        {success && <p className="text-green-600 text-sm text-center bg-green-100 p-2 rounded-md">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <label className="flex items-center space-x-2">
            <input type="checkbox" onChange={() => setShowPassword(!showPassword)} />
            <span>Show Password</span>
          </label>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
            SIGN IN
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
        </p>
      </div>
    </div>
  );
}
