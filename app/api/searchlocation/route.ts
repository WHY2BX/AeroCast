import { NextResponse } from "next/server";

export async function GET(req: Request) {
    // ดึง query parameters จาก URL
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("input") || "Unknown";
    // const hasNumber = /[0-9]/.test(location);
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API_KEY}`
    // if(hasNumber){
    //      url = `http://api.openweathermap.org/geo/1.0/zip?zip=${location}&limit=5&appid=${API_KEY}`
    // }
    

    try{
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Failed to fetch location");
          }
        const data = await response.json()
        return NextResponse.json({data}, {status:200})
    }
    catch(error){
        return NextResponse.json({ error: "" }, { status: 500 });
    }

}
