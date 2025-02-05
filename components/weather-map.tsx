import { Card } from "@/components/ui/card"
import Image from "next/image"

export default function WeatherMap() {
  return (
    <Card className="p-4">
      <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LpEzssrFctFGjfxuwzRTNZb3lpGvTw.png"
          alt="Weather map"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex gap-2 mt-2">
        <button className="flex-1 py-1 px-4 rounded bg-[#7CB9E8] text-white text-sm">Temperature</button>
        <button className="flex-1 py-1 px-4 rounded bg-gray-100 text-gray-600 text-sm">PM2.5</button>
        <button className="flex-1 py-1 px-4 rounded bg-gray-100 text-gray-600 text-sm">Wind</button>
      </div>
    </Card>
  )
}

