import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer"; // adjust the path if needed

import "./globals.css";

export const metadata: Metadata = {
  title: "ExamHack",
  description: "Developed by A P Prajwal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
