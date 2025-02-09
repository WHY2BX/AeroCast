"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { WeatherProps } from "@/app/lib/definitions"


export default function CurrentWeather({ weather, cityName, loading }: { weather: WeatherProps, cityName: string, loading:boolean }) {




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
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-medium">{cityName}</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Today's Weather</div>
            <div className="text-4xl font-bold">{weather?.main?.temp}°C</div>
            <div className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</div>
            <div className="text-sm text-muted-foreground">{weather?.weather?.[0]?.main}</div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Highest</span>
              <span>{weather?.main?.temp_max}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lowest</span>
              <span>{weather?.main?.temp_min}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Humidity</span>
              <span>{weather?.main?.humidity}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Wind Speed</span>
              <span>{weather?.wind?.speed} m/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Feels like</span>
              <span>{weather?.main?.feels_like}°C</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
);
}
