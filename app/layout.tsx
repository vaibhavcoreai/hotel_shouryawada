import type { Metadata } from "next";
import { Baloo_2, Lato } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";

const baloo = Baloo_2({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${baloo.variable} ${lato.variable}`}>
      <body className="bg-charcoal text-cream overflow-x-hidden">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
