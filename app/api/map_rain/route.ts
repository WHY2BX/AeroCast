import { NextResponse } from "next/server"
export function GET(){
    const API_KEY = process.env.OPENWEATHER_API_KEY
    const url = `http://maps.openweathermap.org/maps/2.0/weather/PAR0/{z}/{x}/{y}?date=1552861800&appid=${API_KEY}`

    return NextResponse.json({url})
    
}