"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { signIn, signOut, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className="flex items-center justify-between py-4">
      {/* Logo */}
      <div className="text-2xl font-bold text-[#7CB9E8]">AeroCast</div>

      {/* Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md mx-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search country"
            className="pl-8 w-full"
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* User Authentication Section */}
      <div className="flex items-center gap-2">
        {session ? (
          <>
            <span className="text-sm">{session.user?.name}</span>
            <div className="h-8 w-8 rounded-full bg-[#7CB9E8] text-white flex items-center justify-center">
              <span className="text-sm">{session.user?.name?.charAt(0)}</span>
            </div>
            <button
              onClick={() => signOut()}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => signIn("google")}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/register")}
              className="px-3 py-1 text-sm bg-[#7CB9E8] text-white rounded-md hover:bg-[#5A99C2]"
            >
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
}
