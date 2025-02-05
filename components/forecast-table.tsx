import { Card } from "@/components/ui/card"

export default function ForecastTable() {
  const forecast = [
    { date: "05 FEB 2025", high: "33°C", low: "20°C" },
    { date: "06 FEB 2025", high: "33°C", low: "20°C" },
    { date: "07 FEB 2025", high: "33°C", low: "20°C" },
    { date: "08 FEB 2025", high: "33°C", low: "20°C" },
    { date: "09 FEB 2025", high: "33°C", low: "20°C" },
  ]

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2">7 Day's Forecast</h3>
      <div className="space-y-2">
        <div className="grid grid-cols-3 text-sm text-muted-foreground">
          <div>Date</div>
          <div>Highest</div>
          <div>Lowest</div>
        </div>
        {forecast.map((day) => (
          <div key={day.date} className="grid grid-cols-3 text-sm">
            <div>{day.date}</div>
            <div>{day.high}</div>
            <div>{day.low}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

