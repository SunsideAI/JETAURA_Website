import type { Metadata } from "next";
import "./globals.css";
import LanguageProvider from "@/providers/LanguageProvider";

export const metadata: Metadata = {
  title: "Sky Brokers — Private Jet Charter",
  description: "Sky is not the limit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body style={{ background: "#0A0A0B", minHeight: "100%" }}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
