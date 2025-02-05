import { CloudRain } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function WeatherRecommendation() {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2">Today's Item Recommend</h3>
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
          <CloudRain className="h-6 w-6 text-gray-600" />
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Humidity: 80% Rainy: 60%</div>
          <div className="font-medium">Umbrella</div>
        </div>
      </div>
    </Card>
  )
}

