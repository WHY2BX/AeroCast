"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Sending userData:", userData);
      const res = await axios.post("/api/auth/register", userData);
      if (res.status === 201) {
        // เช็คว่าการสมัครสำเร็จ
        alert("Register complete! Redirect to Login page...");
        router.push("/login"); // เด้งไปหน้า login
      } else {
        alert(`สมัครไม่สำเร็จ: ${res.data.message}`);
      }
    } catch (err: any) {
      alert(`เกิดข้อผิดพลาด: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <body className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="w-full max-w-lg mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-sky-200 px-4 py-3">
            <h2 className="text-lg font-medium text-gray-900 text-center">
              Register
            </h2>
          </div>
          <div className="max-w-md mx-auto p-6 bg-white rounded-md">
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <div className="space-y-2">
                <label className="text-lg font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 border rounded"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-lg font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-lg font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 border rounded"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded"
                >
                  Register
                </button>
              </div>
            </form>
            <button
              className="w-full mt-4 bg-red-500 text-white p-2 rounded"
              onClick={() => signIn("google")}
            >
              Register with Google
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </main>
    </body>
  );
}
