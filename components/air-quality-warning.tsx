import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { PmData } from "@/app/lib/definitions";
import { cn } from "@/lib/utils";

export default function AirQualityWarning({ pm }: PmData) {
  const [state, setState] = useState("Good");

  useEffect(() => {
   
    const pm2_5 = pm?.components.pm2_5;
    if (pm2_5 >= 0 && pm2_5 <= 10) {
      setState("Good");
    } else if (pm2_5 > 10 && pm2_5 <= 25) {
      setState("Fair");
    } else if (pm2_5 > 25 && pm2_5 <= 50) {
      setState("Moderate");
    } else if (pm2_5 > 50 && pm2_5 <= 75) {
      setState("Poor");
    } else {
      setState("Very Poor");
    }
  }, [pm]);

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
