import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";

export const metadata: Metadata = {
  title: "We Met Before - Digital Design & Development Studio",
  description: "A community of freelance creatives, co-creating new realities from infinite possibilities. We focus on branding, web-design and development.",
  keywords: "design, digital, studio, amsterdam, branding, development, website, webflow, react, nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
