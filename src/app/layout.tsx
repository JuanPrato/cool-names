import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";

import { Account } from "@/components/account";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nombres Cool",
  description: "Genera nombres cool para lo que necesites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
        <Account />
        <div className="flex flex-col items-center justify-center min-h-screen py-4 px-4 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100">
          {children}
        </div>
      </body>
    </html>
  );
}
