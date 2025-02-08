"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

export default function RegisterPage() {
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 


    try {
      console.log("Sending userData:", userData);
      const response = await axios.post('/api/auth/register',userData)
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Name" className="w-full p-2 border rounded" 
          value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" 
          value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded" 
          value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
