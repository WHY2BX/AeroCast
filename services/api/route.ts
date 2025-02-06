// http://localhost:3000/api/weather?lat=13.7563&lon=100.5018

import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!lat || !lon) {
        return NextResponse.json({ error: "Missing lat or lon" }, { status: 400 });
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        if (!response.ok) throw new Error("Failed to fetch weather data");

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "error.message" }, { status: 500 });
    }
}