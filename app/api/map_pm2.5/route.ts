import { NextResponse } from "next/server";

export  function GET(){
    const url = 'https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png'
    return NextResponse.json({ url });
}