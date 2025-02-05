"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function CurrentWeather() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch("/api/weather?lat=13.7234&lon=100.7753"); // ลาดกระบัง
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  if (loading) return <p>Loading...</p>;

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
              <div className="text-4xl font-bold">{weather?.main?.temp}°C</div>
              <div className="text-sm space-x-2">
                <span className="text-muted-foreground">Highest</span>
                <span>{weather?.main?.temp_max}°</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</div>
            <div className="text-sm space-x-2">
              <span className="text-muted-foreground">Lowest</span>
              <span>{weather?.main?.temp_min}°</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Humidity</div>
            <div>{weather?.main?.humidity}%</div>
          </div>
          <div>
            <div className="text-muted-foreground">Wind Speed</div>
            <div>{weather?.wind?.speed} m/s</div>
          </div>
          <div>
            <div className="text-muted-foreground">Feels like</div>
            <div>{weather?.main?.feels_like}°C</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
