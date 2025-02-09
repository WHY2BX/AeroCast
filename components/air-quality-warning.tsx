import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { PmData } from "@/app/lib/definitions";
import { cn } from "@/lib/utils";

export default function AirQualityWarning({ latitude, longitude }: Location) {
  const [pm, setPM] = useState<any>(null);
  const [quality, setQuality] = useState({ state: "Good", img: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchPM() {
      const res = await fetch(`/api/pm2.5?lat=${latitude}&lon=${longitude}`);
      const data = await res.json();
      setPM(data.list[0]);
      console.log(data.list[0]);
      const pm2_5 = data.list[0]?.components?.pm2_5;
      pm2_5 >= 0 && pm2_5 <= 10
        ? setQuality({ state: "Good", img: "" })
        : pm2_5 > 10 && pm2_5 <= 25
        ? setQuality({ state: "Fair", img: "" })
        : pm2_5 > 25 && pm2_5 <= 50
        ? setQuality({ state: "Moderate", img: "" })
        : pm2_5 > 50 && pm2_5 <= 75
        ? setQuality({ state: "Poor", img: "" })
        : setQuality({ state: "Very Poor", img: "" });
    }
    setLoading(false);
    fetchPM();
  }, [latitude, longitude]);

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
      <h3 className="text-sm font-medium mb-4">PM2.5 State</h3>
      <div className="flex items-center justify-between">
        <img src="รูปจ้า" alt="" />

        <div>
          <div
            className={cn(
              "text-3xl font-bold",
              state === "Good"
                ? "text-green-500"
                : state === "Fair"
                ? "text-yellow-500"
                : state === "Moderate"
                ? "text-orange-500"
                : state === "Poor"
                ? "text-red-500"
                : "text-purple-500"
            )}
          >
            {pm?.components?.pm2_5} μg/m3
          </div>

          <div
            className={cn(
              "text-3xl font-bold",
              state === "Good"
                ? "text-green-500"
                : state === "Fair"
                ? "text-yellow-500"
                : state === "Moderate"
                ? "text-orange-500"
                : state === "Poor"
                ? "text-red-500"
                : "text-purple-500"
            )}
          >
            {state}
          </div>
        </div>
      </div>
    </Card>
  );
}
