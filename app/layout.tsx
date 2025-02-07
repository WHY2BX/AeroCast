import type { Metadata } from "next";
import "./globals.css";
import Providers from "./client-layout"; // 👈 import Providers

export const metadata: Metadata = {
  title: 'AeroCast',
  description: 'Weather & Pm2.5 checking website',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers> {/* 👈 ห่อ Providers */}
      </body>
    </html>
  );
}
