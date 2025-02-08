"use client";

import Header from "./header"
import Navigation from "./navigation"
import CurrentWeather from "./current-weather"
import WeatherMap from "./weather-map"
import WeatherGraphs from "./weather-graphs"
import ForecastTable from "./forecast-table"
import WeatherRecommendation from "./weather-recommendation"
import AirQualityWarning from "./air-quality-warning"



import {useState, useEffect} from "react"
export default function WeatherDashboard() {
  const [location, setLocation] = useState({ latitude: 13.736717, longitude: 100.523186, cityName: "Bangkok" });

  useEffect(() => {
    getLocation()
  }, []);

  function getLocation(){
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(successGet)
  }

  async function successGet(position:GeolocationPosition){
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    const geoRes = await fetch(`/api/location?lat=${lat}&lon=${lon}`);
    const geoData = await geoRes.json();
    // console.log(geoData.address)
    const locate = (
      {
        latitude: lat,
        longitude: lon,
        cityName: geoData.address?.suburb || geoData.address?.city || geoData.address?.village || "Unknown Location"
      }
    )

    setLocation(location=>{
      return locate
    })
    console.log('lat = ',locate.latitude)
    console.log('lon = ', locate.longitude)
    console.log('city = ', locate.cityName)

  }


  return (
    <div className="max-w-7xl mx-auto p-4">
      <Header setLocation={setLocation} />
      <Navigation />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-4">
          <CurrentWeather latitude={location.latitude} longitude={location.longitude} cityName={location.cityName}/>
          <WeatherMap latitude={location.latitude} longitude={location.longitude} />
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

