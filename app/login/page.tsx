"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [userData, setUserData] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      name: userData.name,
      password: userData.password,
      redirect: false, // ป้องกัน redirect อัตโนมัติ
    });

    if (res?.error) {
      setError("Invalid username or password");
    } else {
      alert("Login successful! Redirecting...");
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"> 
      <main className="w-full max-w-lg mx-auto py-8 px-4 ">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-sky-200 px-4 py-3">
            <h2 className="text-lg font-medium text-gray-900 text-center">
              Login
            </h2>
          </div>
          <div className="max-w-md mx-auto p-6 bg-white rounded-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded"
              >
                Login
              </button>
            </form>
            <button
              className="w-full mt-4 bg-red-500 text-white p-2 rounded"
              onClick={() => signIn("google")}
            >
              Login with Google
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </main>
      </div>

  );
}
