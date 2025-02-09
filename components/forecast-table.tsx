import { Card } from "@/components/ui/card"
import {Location} from "@/app/lib/definitions"
import { useState, useEffect } from "react"
import {ForecastProps} from "@/app/lib/definitions"
export default function ForecastTable({forecast}:ForecastProps) {


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

