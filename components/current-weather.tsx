"use client";

import { useEffect, useState } from "react";
import { Heart, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { WeatherProps } from "@/app/lib/definitions";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

export default function CurrentWeather({
  weather,
  cityName,
  loading,
}: {
  weather: WeatherProps;
  cityName: string;
  loading: boolean;
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState<{ name: string }[]>([]);

  const { data: session } = useSession();
  const userId = session?.user.id;

  // ดึงข้อมูล favorite locations ของผู้ใช้
  useEffect(() => {
    async function fetchFavorites() {
      if (!userId) return;
      try {
        const response = await fetch(`/api/favorite?userId=${userId}`);
        const data = await response.json();
        setFavorites(data.favorites || []);

        // ตรวจสอบว่า cityName อยู่ใน Favorites หรือไม่
        setIsFavorite(data.favorites?.some((fav: { name: string }) => fav.name === cityName));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }
    fetchFavorites();
  }, [userId, cityName]);

  const handleFavorite = async () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    try {
      const response = await fetch("/api/favorite", {
        method: newFavoriteState ? "POST" : "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          name: cityName,
          latitude: weather.coord.lat,
          longitude: weather.coord.lon,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update favorite location");
      }

      const result = await response.json();
      console.log("Favorite updated:", result);

      // อัปเดตรายการ favorites ใน state
      setFavorites((prev) =>
        newFavoriteState
          ? [...prev, { name: cityName }]
          : prev.filter((fav) => fav.name !== cityName)
      );
    } catch (error) {
      console.error("Error updating favorite location:", error);
    }
  };

  if (loading) {
    return (
      <div className="skeleton space-y-4">
        <div className="skeleton-title"></div>
        <div className="skeleton-line"></div>
      </div>
    );
  }

  return (
    <Card className="p-4 relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 rounded-full"
        onClick={handleFavorite}
      >
        <Heart
          className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
        />
      </Button>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-medium">
            {cityName}, {weather.sys.country}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Today's Weather</div>
            <div className="text-4xl font-bold">{weather.main.temp}°C</div>
            <div className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString()}
            </div>
            <div className="text-sm text-muted-foreground">{weather.weather[0].main}</div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Highest</span>
              <span>{weather.main.temp_max}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lowest</span>
              <span>{weather.main.temp_min}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Humidity</span>
              <span>{weather.main.humidity}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Wind Speed</span>
              <span>{weather.wind.speed} m/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Feels like</span>
              <span>{weather.main.feels_like}°C</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
