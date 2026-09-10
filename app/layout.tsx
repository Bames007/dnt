import type { Metadata } from "next";
import { Black_Ops_One, Ojuju } from "next/font/google";
import "./globals.css";

const blackOpsOne = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-black-ops",
});

const ojuju = Ojuju({
  subsets: ["latin"],
  variable: "--font-ojuju",
});

export const metadata: Metadata = {
  title: "Diaspora Network for Tinubu | Rally 2026",
  description:
    "Official political rally portal for the Diaspora Network supporting President Tinubu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${blackOpsOne.variable} ${ojuju.variable}`}
      suppressHydrationWarning={true}
    >
      <body className="bg-[#f4ecd8] text-[#1a1a1a] antialiased selection:bg-[#2d6a4f] selection:text-white">
        {children}
      </body>
    </html>
  );
}
