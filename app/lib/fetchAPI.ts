import { Location } from "@/app/lib/definitions";

export async function fetchWeather({ latitude, longitude }: Location) {
  try {
    const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

export async function fetchForecast({ latitude, longitude }: Location) {
  try {
    const res = await fetch(`/api/forecast?lat=${latitude}&lon=${longitude}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchPM({ latitude, longitude }: Location) {
  const res = await fetch(`/api/pm2.5?lat=${latitude}&lon=${longitude}`);
  const data = await res.json();
  return data.list[0];
}

export async function fetchHistory({ latitude, longitude }: Location) {
  try {
    const res = await fetch(`/api/history?lat=${latitude}&lon=${longitude}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
