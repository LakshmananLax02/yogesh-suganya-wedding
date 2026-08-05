import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const serif = Cormorant_Garamond({ variable: "--font-wedding-serif", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"] });
const sans = Manrope({ variable: "--font-wedding-sans", subsets: ["latin"], weight: ["400", "500", "600"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.png`;
  const title = "Yogesh & Suganya | Wedding Invitation";
  const description = "Join Yogesh and Suganya as they celebrate their wedding on September 13, 2026, at Nithilam Mahal, Karumathampatti.";
  return {
    title,
    description,
    openGraph: { title, description, type: "website", images: [{ url: image, width: 1200, height: 630, alt: "Yogesh and Suganya wedding invitation" }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="scroll-smooth"><body className={`${serif.variable} ${sans.variable} antialiased`}>{children}</body></html>;
}
