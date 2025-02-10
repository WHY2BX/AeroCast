import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { PmData } from "@/app/lib/definitions";
import { cn } from "@/lib/utils";

export default function AirQualityWarning({
  pm,
  loading,
}: {
  pm: PmData;
  loading: boolean;
}) {
  const [state, setState] = useState("Good");

  useEffect(() => {
    async function fetchPM() {
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
    }
    fetchPM();
  }, [pm]);

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
        <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
          {state === "Good" || state === "Fair"  || state === "Moderate"? (
            <img
              src="https://cdn-icons-png.freepik.com/512/3542/3542930.png"
              alt=""
            />
          ) : state === "Poor" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-8 w-8 text-gray-600"
            >
              <path d="M8 11V9a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm7 1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1zm8 0A11 11 0 1 1 12 1a11.038 11.038 0 0 1 11 11zm-19.972-.549 4.485 2.691 2.236-1.127a5.018 5.018 0 0 1 4.5 0l2.236 1.127 4.485-2.691a8.988 8.988 0 0 0-17.944 0zM20.8 13.888l-2.2 1.319 1.475.743a8.88 8.88 0 0 0 .725-2.062zM19 17.647 13.351 14.8a3.01 3.01 0 0 0-2.7 0L5 17.647a8.977 8.977 0 0 0 13.994 0zM3.926 15.95l1.474-.743-2.2-1.319a8.88 8.88 0 0 0 .726 2.062z" />
            </svg>
          ) : (
            <img src="https://static.thenounproject.com/png/447632-200.png"/>
          )}
        </div>
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
