import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/core_components/navbar/navbar";
import Footer from "./components/core_components/footer/footer";
import { OrderProvider } from "./context/OrderContext"; // Import OrderProvider

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
      <body>
        <OrderProvider> {/* Wrap the entire app with OrderProvider */}
          <Navbar />
          {children}
          <Footer />
        </OrderProvider>
      </body>
    </html>
  );
}
