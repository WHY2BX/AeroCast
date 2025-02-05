import Header from "./header"
import Navigation from "./navigation"
import CurrentWeather from "./current-weather"
import WeatherMap from "./weather-map"
import WeatherGraphs from "./weather-graphs"
import ForecastTable from "./forecast-table"
import WeatherRecommendation from "./weather-recommendation"
import AirQualityWarning from "./air-quality-warning"

export default function WeatherDashboard() {
  return (
    <div className="max-w-7xl mx-auto p-4">
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

