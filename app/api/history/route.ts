import { HistoryProp } from "@/app/lib/definitions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
    }

    const now = Math.floor(Date.now() / 1000); // เวลาปัจจุบัน (Unix timestamp)
    const start = now - 24 * 60 * 60; // 24 ชั่วโมงก่อนหน้า
    const end = now;

    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const url = `https://history.openweathermap.org/data/2.5/history/city?lat=${lat}&lon=${lon}&type=hour&start=${start}&end=${end}&appid=${API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`OpenWeather API Error: ${res.statusText}`);
    }

    const data: HistoryProp = await res.json();

    if (!data || !data.list) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 500 });
    }

    return NextResponse.json(data); // ✅ คืนค่า response JSON ที่ถูกต้อง
  } catch (error) {
    console.error("Error fetching weather history:", error);
    return NextResponse.json({ error: "Failed to fetch history data" }, { status: 500 });
  }
}
