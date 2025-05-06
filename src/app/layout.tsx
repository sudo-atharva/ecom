import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechParts - Electronics Components & DIY Kits",
  description: "Your one-stop shop for electronics components, DIY kits, microcontroller boards, sensors, and tools. Quality parts for makers, hobbyists, and professionals.",
  keywords: "electronics components, DIY kits, Arduino, sensors, microcontroller boards, electronics tools",
  openGraph: {
    title: "TechParts - Electronics Components & DIY Kits",
    description: "Your one-stop shop for electronics components, DIY kits, microcontroller boards, sensors, and tools.",
    url: "https://techparts.com",
    siteName: "TechParts",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TechParts - Electronics Components Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
