import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./fonts";

export const metadata: Metadata = {
  title: "Bitscale Grid - Data Management",
  description:
    "Professional data grid for managing company information and enrichment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
