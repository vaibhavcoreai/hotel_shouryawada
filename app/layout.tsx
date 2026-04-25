import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hotel Shauryawada — Ruling Hearts Across Maharashtra",
  description:
    "Hotel Shauryawada — Maharashtra's legendary dhaba chain famous for authentic Mutton Raan, Chicken Raan, Kolhapuri cuisine. 8 branches across Pune, Nashik, Ahilyanagar & more.",
  keywords: [
    "Hotel Shauryawada",
    "Mutton Raan",
    "Chicken Raan",
    "Maharashtrian dhaba",
    "Kolhapuri food",
    "Handewadi restaurant",
    "Wagholi restaurant",
    "Nashik dhaba",
  ],
  openGraph: {
    title: "Hotel Shauryawada — Ruling Hearts Across Maharashtra",
    description:
      "The Raan Dynasty. Authentic Maharashtrian dhaba with legendary Mutton & Chicken Raan across 8 cities.",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable}`}>
      <body className="bg-cream text-charcoal overflow-x-hidden">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
