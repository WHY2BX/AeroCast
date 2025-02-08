import { NextResponse } from "next/server";

export  function GET() {

    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const url = `http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid=${API_KEY}&fill_bound=true&opacity=0.6&palette=-65:821692;-55:821692;-45:821692;-40:821692;-30:8257db;-20:208cec;-10:20c4e8;0:23dddd;10:c2ff28;20:fff028;25:ffc228;30:fc8014`

    return NextResponse.json({ url });


}
