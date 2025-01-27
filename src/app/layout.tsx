import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/core_components/navbar/navbar";

export const metadata: Metadata = {
  title: "Crunchee Munchies",
  description: "The Best Chin-chin in The World!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
