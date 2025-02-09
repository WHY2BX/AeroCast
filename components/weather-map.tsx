'use Client'
import { Card } from "@/components/ui/card";
import {
  MapContainer,
  TileLayer,
  useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils"
import { Location } from "@/app/lib/definitions"
import Skeleton from "./Skeleton";

// ใช้ปรับตำเเหน่ง center ของ map ใหม่ตอนผู้ใช้เปลี่ยนสถานที่
function ChangeMapCenter({ center }: { center: LatLngTuple }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function WeatherMap({ latitude, longitude }: Location) {
  const [map, setMap] = useState('/api/map_temp');
  const [activeTab, setActiveTab] = useState("temp");
  const [center, setCenter] = useState<LatLngTuple>([latitude, longitude]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    console.log("Updating center:", latitude, longitude);
    setCenter([latitude, longitude]);
    changeMap(1);
    setLoading(false);
  }, [latitude, longitude]);

  
  const changeMap = async (buttonID:number) =>{
    try {
      const res = await fetch(
        buttonID === 1 ? '/api/map_temp' : buttonID === 2 ? '/api/map_pm2.5' : '/api/map_rain'
      );
      const data = await res.json();
      setMap(data.url);
      buttonID === 1? setActiveTab('temp') : buttonID === 2 ? setActiveTab('pm'): setActiveTab('rain')
    } catch (error) {
      
    }
  }
  
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
      <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
        <MapContainer center={center} zoom={13} scrollWheelZoom={true} className="h-full w-full">
          <TileLayer
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <TileLayer url={map} />
          <ChangeMapCenter center={center} />
        </MapContainer>
      </div>
      <div className="flex gap-2 mt-2">
        <button className={cn("flex-1 py-1 px-4 rounded text-sm", activeTab === 'temp' ? "bg-[#7CB9E8] text-white" : "bg-gray-100 text-gray-600")} onClick={()=>changeMap(1)}>Temperature</button>
        <button className={cn("flex-1 py-1 px-4 rounded text-sm", activeTab === 'pm' ? "bg-[#7CB9E8] text-white" : "bg-gray-100 text-gray-600")} onClick={()=>changeMap(2)}>PM2.5</button>
        <button className={cn("flex-1 py-1 px-4 rounded text-sm", activeTab === 'rain' ? "bg-[#7CB9E8] text-white" : "bg-gray-100 text-gray-600")} onClick={()=>changeMap(3)}>Accumulated precipitation rain</button>
      </div>
    </Card>
  );
}
