import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aurora & Co. | Cinematic Dining Template",
  description:
    "Aurora & Co. — A premium cinematic dining template for restaurants.",
  keywords: "restaurant, cinematic, dining, premium, gourmet",
  openGraph: {
    title: "Aurora & Co. | Cinematic Dining Template",
    description:
      "Aurora & Co. — A premium cinematic dining template for restaurants.",
    type: "website",
  },
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
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Sora:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-brand-sand">{children}</body>
    </html>
  );
}
