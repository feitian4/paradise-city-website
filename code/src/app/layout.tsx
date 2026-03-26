import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paradise City | 香格里拉天堂之城",
  description: "Your Portal to Inner Peace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
