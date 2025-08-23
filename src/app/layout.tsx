import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Wedding of Ucha & Ismail",
  description:
    "Join us in celebrating the wedding of Salsabila Azzahra & Ismail Abdan Syakuro Firmansyah on September 6, 2025",
  keywords: "wedding, invitation, Ucha, Ismail, Salsabila, September 2025",
  authors: [{ name: "Fatan Aminullah", url: "https://fatanaminullah.com/" }],
  openGraph: {
    title: "The Wedding of Ucha & Ismail",
    description: "Join us in celebrating our special day - September 6, 2025",
    type: "website",
    images: ["/banner.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-sans`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
