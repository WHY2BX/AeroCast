'use Client'
import { Search } from "lucide-react"
import Input from "@/components/input"
import SearchResultList from "@/components/searchResult"
import { useState } from "react"

interface InputProps {
  setLocation: (value: { latitude: number; longitude: number; cityName: string }) => void;
}

export default function Header({ setLocation }: InputProps) {
  const [searchResult, setSearchResult] = useState<any>(null)
  const [search, setSearch] = useState("")
  return (
    <header className="flex items-center justify-between py-4">
      <div className="text-2xl font-bold text-[#7CB9E8]">AeroCast</div>
      <div className="flex items-center gap-4 flex-1 max-w-md mx-4">
        <div className="relative flex-1">
          <Input setSearchResult={setSearchResult} setSearch={setSearch} search={search}/>
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <div className="absolute top-full left-0 w-full bg-white shadow-lg z-[9999] border border-gray-200 space-y-2">
            <SearchResultList results={searchResult} setLocation={setLocation} setSearchResult={setSearchResult} setSearch={setSearch} />
          </div>
        </div>

      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Adam Smith</span>
        <div className="h-8 w-8 rounded-full bg-[#7CB9E8] text-white flex items-center justify-center">
          <span className="text-sm">AS</span>
        </div>
      </div>
    </header>
  )
}

