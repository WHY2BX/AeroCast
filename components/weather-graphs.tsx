"use client";

import { Card } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { HistoryProp } from "@/app/lib/definitions";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
};

export default function WeatherGraphs({ history, loading }: { history: HistoryProp; loading: boolean }) {
  if (loading) {
    return <p>Loading...</p>;
  }

  
  // ตรวจสอบว่ามีข้อมูลหรือไม่
 

  // ดึงค่าเวลามาเป็น labels (แปลงเป็น HH:mm)
  const labels = history.map((entry) =>
    new Date(entry?.dt * 1000).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  );

  // ดึงค่าที่ต้องการ เช่น อุณหภูมิ
  const tempData = history.map((entry) => (entry?.main?.temp)-273);
  // ถ้ามีค่าฝุ่น PM2.5 ให้ดึงออกมา (ตอนนี้ไม่มีใน API response)
  const pm25Data = history.map(() => Math.random() * 50); // สมมติว่ามีค่า PM2.5

  const tempDataset = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: tempData,
        borderColor: "#FFB800",
        backgroundColor: "rgba(255, 184, 0, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const pm25Dataset = {
    labels,
    datasets: [
      {
        label: "PM2.5",
        data: pm25Data,
        borderColor: "#FF3D00",
        backgroundColor: "rgba(255, 61, 0, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <Card className="p-4">
      <div className="space-y-6">
        {/* กราฟอุณหภูมิ */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium">Temperature Graph</h3>
          </div>
          <div className="h-[200px]">
            <Line options={options} data={tempDataset} />
          </div>
        </div>

        {/* กราฟ PM2.5 */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium">PM2.5 Graph</h3>
          </div>
          <div className="h-[200px]">
            <Line options={options} data={pm25Dataset} />
          </div>
        </div>
      </div>
    </Card>
  );
}
