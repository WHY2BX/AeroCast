"use client"

import { Card } from "@/components/ui/card"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: false,
    },
  },
}

const labels = ["32", "29", "27", "26", "25"]
const data = {
  labels,
  datasets: [
    {
      data: [32, 29, 27, 26, 25],
      borderColor: "#FFB800",
      backgroundColor: "rgba(255, 184, 0, 0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
}

export default function WeatherGraphs() {
  return (
    <Card className="p-4">
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium">Temperature Graph</h3>
            <div className="flex gap-2">
              <button className="text-xs px-2 py-1 rounded bg-gray-100">Hourly</button>
              <button className="text-xs px-2 py-1 rounded bg-white text-muted-foreground">Daily</button>
            </div>
          </div>
          <div className="h-[200px]">
            <Line options={options} data={data} />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium">PM2.5 Graph</h3>
            <div className="flex gap-2">
              <button className="text-xs px-2 py-1 rounded bg-gray-100">Hourly</button>
              <button className="text-xs px-2 py-1 rounded bg-white text-muted-foreground">Daily</button>
            </div>
          </div>
          <div className="h-[200px]">
            <Line options={options} data={data} />
          </div>
        </div>
      </div>
    </Card>
  )
}

