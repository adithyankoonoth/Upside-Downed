import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UPSIDE DOWNED — Hackathon 2025",
  description:
    "She is still trapped. The Gate fractured. Engineers are needed to bring Eleven home. Join the Hackathon.",
  keywords: ["hackathon", "stranger things", "upside down", "eleven", "coding"],
  openGraph: {
    title: "UPSIDE DOWNED — Hackathon 2025",
    description: "Help Eleven escape the Upside Down. Join the Hackathon.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=VT323&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-void antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
