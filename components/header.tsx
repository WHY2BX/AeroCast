'use Client'
import { Search } from "lucide-react"
import Input from "@/components/input"
import SearchResultList from "@/components/searchResult"
import { useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react";
import {SearchProps} from "@/app/lib/definitions"

import { useRouter } from "next/navigation";  


export default function Header({ setLocation }: SearchProps) {
  const [searchResult, setSearchResult] = useState<any>(null) //ใช้รับค่าผลการ search
  const [search, setSearch] = useState("") //ใช้รับค่า input การ search
  const { data: session } = useSession();
  const router = useRouter();
  
  return (
    <header className="flex items-center justify-between py-4">
      {/* Logo */}
      <div className="text-2xl font-bold text-[#7CB9E8]">AeroCast</div>

      {/* Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md mx-4">
        <div className="relative flex-1">
          <Input setSearchResult={setSearchResult} setSearch={setSearch} search={search}/>
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <div className="absolute top-full left-0 w-full bg-white shadow-lg z-[9999] border border-gray-200 space-y-2">
            <SearchResultList results={searchResult} setLocation={setLocation} setSearchResult={setSearchResult} setSearch={setSearch} />
          </div>
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
              onClick={() => router.push("/login")}
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
