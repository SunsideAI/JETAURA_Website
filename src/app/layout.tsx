import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sky Brokers — Private Jet Charter",
  description: "Beyond schedules. Anywhere. Within 90 minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body style={{ background: "#0A0A0B", minHeight: "100%" }}>{children}</body>
    </html>
  );
}
