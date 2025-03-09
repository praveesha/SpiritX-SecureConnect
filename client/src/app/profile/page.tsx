"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "../../services/api";



export default function Profile() {
const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized");
      return;
    }

    fetchUserProfile(token)
      .then((res) => setUser(res.data))
      .catch(() => setError("Failed to fetch user profile"));
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-r from-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-2xl text-center  w-[500px] h-[500px] ">
        <img
          src={`https://ui-avatars.com/api/?name=${user.username}&background=random&color=fff&size=128`}
          alt="Profile Avatar"
          className="w-24 h-24 rounded-full mx-auto shadow-md"
        />
        <h2 className="text-3xl font-bold text-gray-700 mt-4 py-6">Welcome, {user.username}!</h2>
        <p className="text-gray-600 mt-2">You are now logged in.</p>

        <div className="mt-6 py-25">
          <button
            className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition"
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/signin");
            }}
          >
            Logout
          </button>
        </div>
       </div>
    </div>
  );
}
