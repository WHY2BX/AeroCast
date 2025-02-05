import { MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function CurrentWeather() {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-medium">Ladkrabang, Thailand</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Today's Weather</div>
            <div className="flex items-baseline gap-4">
              <div className="text-4xl font-bold">30°C</div>
              <div className="text-sm space-x-2">
                <span className="text-muted-foreground">Highest</span>
                <span>33°</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">05 FEB 2025</div>
            <div className="text-sm space-x-2">
              <span className="text-muted-foreground">Lowest</span>
              <span>25°</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Humidity</div>
            <div>75%</div>
          </div>
          <div>
            <div className="text-muted-foreground">UV Index</div>
            <div>Extreme</div>
          </div>
          <div>
            <div className="text-muted-foreground">Moonrise</div>
            <div>06:00PM</div>
          </div>
          <div>
            <div className="text-muted-foreground">Sunrise</div>
            <div>06:00AM</div>
          </div>
          <div>
            <div className="text-muted-foreground">Feels like</div>
            <div>-5°</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

