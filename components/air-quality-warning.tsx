import { Card } from "@/components/ui/card"

export default function AirQualityWarning() {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-4">PM2.5 State</h3>
      <div className="flex items-center justify-between">
        <div className="h-12 w-12 rounded-lg border-2 border-gray-200 flex items-center justify-center font-medium">
          N95
        </div>
        <div>
          <div className="text-3xl font-bold text-red-500">200</div>
          <div className="text-red-500">Danger</div>
        </div>
      </div>
    </Card>
  )
}

