import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/lib/context/CartContext";
import { AuthProvider } from '@/lib/context/AuthContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Naviyantra - Electronics Components & DIY Kits",
  description: "Your one-stop shop for electronics components, DIY kits, microcontroller boards, sensors, and tools. Quality parts for makers, hobbyists, and professionals.",
  keywords: "electronics components, DIY kits, Arduino, sensors, microcontroller boards, electronics tools",
  openGraph: {
    title: "Naviyantra - Electronics Components & DIY Kits",
    description: "Your one-stop shop for electronics components, DIY kits, microcontroller boards, sensors, and tools.",
    url: "https://naviyantra.com",
    siteName: "Naviyantra",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Naviyantra - Electronics Components Store",
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
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen bg-gray-50">
              {children}
            </main>
            <Toaster position="bottom-right" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
