"use client";

import { Cloud, Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface FavoriteLocation {
    name: string;
    latitude: number;
    longitude: number;
    weather: string;
    temperature: number;
}

export default function FavoriteLocations() {
    const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);
    const { data: session } = useSession();
    const userId = session?.user?.id;

    useEffect(() => {
        if (!userId) return;

        async function fetchFavorites() {
            try {
                const res = await fetch(`/api/favorite?userId=${userId}`);
                const data = await res.json();
                setFavorites(data.favorites || []);
            } catch (err) {
                console.error("Error fetching favorites:", err);
            }
        }

        fetchFavorites();
    }, [userId]);

    const handleFavorite = async (cityName: string) => {
        if (!userId) return;

        try {
            const response = await fetch("/api/favorite", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, name: cityName }),
            });

            if (!response.ok) {
                throw new Error("Failed to remove favorite location");
            }

            setFavorites((prev) => prev.filter((fav) => fav.name !== cityName));
            console.log("Favorite removed:", cityName);
        } catch (error) {
            console.error("Error updating favorite location:", error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-md p-4 space-y-3">
                {favorites.length === 0 ? (
                    <p className="text-center text-gray-500">No favorite locations yet.</p>
                ) : (
                    favorites.map((fav) => (
                        <div
                            key={fav.name}
                            className="relative flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 text-white"
                        >
                            <div className="flex items-center gap-3">
                                <Cloud className="w-6 h-6" />
                                <div>
                                    <h2 className="text-xl font-medium">{fav.name}</h2>
                                    <p className="text-sm text-blue-100">{fav.weather}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-semibold">{fav.temperature}°C</span>
                                <button
                                    onClick={() => handleFavorite(fav.name)}
                                    className="text-white hover:text-pink-200 transition-colors"
                                >
                                    <Heart className="w-5 h-5 fill-current text-pink-500" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
