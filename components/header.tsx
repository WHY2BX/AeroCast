import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      <div className="text-2xl font-bold text-[#7CB9E8]">AeroCast</div>
      <div className="flex items-center gap-4 flex-1 max-w-md mx-4">
        <div className="relative flex-1">
          <Input type="text" placeholder="Search country" className="pl-8 w-full" />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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

