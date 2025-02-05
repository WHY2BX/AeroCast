//World Import

"use client";

import Header from "./header"
import Navigation from "./navigation"
import CurrentWeather from "./current-weather"
import WeatherMap from "./weather-map"
import WeatherGraphs from "./weather-graphs"
import ForecastTable from "./forecast-table"
import WeatherRecommendation from "./weather-recommendation"
import AirQualityWarning from "./air-quality-warning"

//Import for API
import { useEffect, useState } from "react";
import { GET } from "@/services/api/route";


export default function WeatherDashboard() {
  //api data

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  let province = 'notfound';
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("../services/api/route"); // เรียก API ที่สร้างไว้
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        setData(result);
        province = result.name
      } catch (err) {
        if(err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  

  //page
  return (
    <div className="max-w-7xl mx-auto p-4">
      {province}
      <Header />
      <Navigation />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-4">
          <CurrentWeather />
          <WeatherMap />
          <WeatherGraphs />
        </div>
        <div className="space-y-4">
          <WeatherRecommendation />
          <ForecastTable />
          <AirQualityWarning />
        </div>
      </div>
    </div>
  )
}

