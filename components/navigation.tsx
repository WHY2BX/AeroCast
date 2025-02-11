"use client";

import { cn } from "@/lib/utils";

export default function Navigation({ activeTab, setActiveTab }) {
  const tabs = ["Today", "Favorite", "Graph"];

  return (
    <nav className="bg-[#7CB9E8] rounded-lg p-1">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-md",
              activeTab === tab ? "bg-white text-[#7CB9E8]" : "text-white hover:bg-white/10"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}
