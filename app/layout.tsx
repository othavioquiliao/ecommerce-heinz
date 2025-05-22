import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Serif_Khitan_Small_Script,
  Martian_Mono,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifKhitanSmallScript = Noto_Serif_Khitan_Small_Script({
  variable: "--font-noto-serif-khitan-small-script",
  subsets: ["latin"],
  weight: ["400"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Heinz",
  description: "Teste de e-commerce Heinz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerifKhitanSmallScript.variable} ${martianMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
