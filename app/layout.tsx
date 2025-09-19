import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const comic = localFont({
  src: "../public/fonts/Comic.ttf",
  variable: "--font-comic",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Advent Comics",
  description: "Created by Maxjoy Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} ${comic.className} font-comic antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
