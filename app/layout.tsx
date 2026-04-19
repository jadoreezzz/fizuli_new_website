import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import StickyNav from "@/components/StickyNav";
import { CartProvider } from "@/lib/cart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fizuli",
  description: "Интернет-магазин одежды",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fffffd]">
        <CartProvider>
          <StickyNav />
          <div className="flex-1">
            {children}
          </div>
          <div className="h-32 bg-[#fffffd]" />
          <Footer />
          <ScrollToTop />
        </CartProvider>
      </body>
    </html>
  );
}
