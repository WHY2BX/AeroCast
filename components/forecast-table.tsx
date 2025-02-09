import { Card } from "@/components/ui/card"
import {Location} from "@/app/lib/definitions"
import { useState, useEffect } from "react"

export default function ForecastTable({ latitude, longitude }: Location) {
  const [forecast, setForecast] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() =>
  {
    setLoading(true);
    async function fetchForecast() {
      try {
        const res = await fetch(`/api/forecast?lat=${latitude}&lon=${longitude}`)
        const data = await res.json()
        setForecast(data.list || [])
        console.log(forecast)
      } catch (error) {
        console.log(error)
      }
      setLoading(false);
    }
    fetchForecast()

  },[latitude, longitude])

  if (loading) {
    return (
      <div className="skeleton space-y-4">
        <div className="skeleton-title"></div>
        <div className="skeleton-line"></div>
      </div>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2">7 Day's Forecast</h3>
      <div className="space-y-2">
        <div className="grid grid-cols-3 text-sm text-muted-foreground">
          <div>Date</div>
          <div>Weather</div>
          <div>Temperature (min-max)</div>
        </div>
        {forecast.map((fore: any) => (
          <div key={fore.dt} className="grid grid-cols-3 text-sm">
            <div>{new Date(fore.dt * 1000).toLocaleDateString()}</div>
            <div>
            <div>{fore.weather[0].main} <img src={`https://openweathermap.org/img/wn/${fore.weather[0].icon}.png`} className="inline-block" /></div>
            </div>
            <div>{(fore.temp.min - 273).toFixed(2)}°C , {(fore.temp.max - 273).toFixed(2)}°C</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

