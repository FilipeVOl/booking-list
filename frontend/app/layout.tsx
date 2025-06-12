import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "./providers/AppProviders";

export const metadata: Metadata = {
  title: "Booking List",
  description: "Made by @filipeVOl",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
