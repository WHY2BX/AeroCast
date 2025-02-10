'use client'
import { fetchForecast, fetchPM, fetchWeather } from "@/app/lib/fetchAPI";
import { useEffect, useState } from "react";
import { CardSkeleton, ForecastSkeleton } from "./ui/skeleton";
import CurrentWeather from "./current-weather";
import Header from "./header";
import Navigation from "./navigation";
import WeatherMap from "./weather-map";
import WeatherGraphs from "./weather-graphs";
import WeatherRecommendation from "./weather-recommendation";
import ForecastTable from "./forecast-table";
import AirQualityWarning from "./air-quality-warning";

export default function WeatherDashboard() {
  const [location, setLocation] = useState({
    latitude: 13.736717,
    longitude: 100.523186,
    cityName: "Bangkok",
  });
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>([]);
  const [pm, setPM] = useState<any>(null);

  // Loading states
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [loadingForecast, setLoadingForecast] = useState(true);
  const [loadingPM, setLoadingPM] = useState(true);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoadingWeather(true);
        const weatherData = await fetchWeather({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        setWeather(weatherData);
      } catch (err) {
        console.error("Error fetching weather:", err);
      } finally {
        setLoadingWeather(false);
      }
    };

    const fetchForecastData = async () => {
      try {
        setLoadingForecast(true);
        const forecastData = await fetchForecast({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        setForecast(forecastData.list);
      } catch (err) {
        console.error("Error fetching forecast:", err);
      } finally {
        setLoadingForecast(false);
      }
    };

    const fetchPMData = async () => {
      try {
        setLoadingPM(true);
        const pmData = await fetchPM({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        setPM(pmData);
      } catch (err) {
        console.error("Error fetching PM data:", err);
      } finally {
        setLoadingPM(false);
      }
    };

    fetchWeatherData();
    fetchForecastData();
    fetchPMData();
  }, [location]);

  function getLocation() {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(successGet);
  }

  async function successGet(position: GeolocationPosition) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const geoRes = await fetch(`/api/location?lat=${lat}&lon=${lon}`);
    const geoData = await geoRes.json();
    console.log(geoData)
    const locate = (
      {
        latitude: lat,
        longitude: lon,
        cityName: geoData.address?.suburb || geoData.address?.city || geoData.address?.village || "Unknown Location"
      }
    )

    setLocation(locate);
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Header setLocation={setLocation} />
      <Navigation />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-4">
          {loadingWeather ? (
            <CardSkeleton />
          ) : (
            <CurrentWeather
              weather={weather}
              cityName={location.cityName}
              loading={loadingWeather}
            />
          )}

          <WeatherMap
            latitude={location.latitude}
            longitude={location.longitude}
          />

          <WeatherGraphs />
        </div>
        <div className="space-y-4">
          <WeatherRecommendation weather={weather} pm={pm} />

          {loadingForecast ? (
            <ForecastSkeleton />
          ) : (
            <ForecastTable forecast={forecast} loading={loadingForecast} />
          )}

          {loadingPM ? (
            <ForecastSkeleton />
          ) : (
            <AirQualityWarning pm={pm} loading={loadingPM} />
          )}
        </div>
      </div>
    </div>
  );
}
