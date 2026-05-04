import type { Metadata } from "next";
import Script from "next/script";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chris Tarasovs",
  description: "Head of Engineering | Helping Teams Scale with AI & Automation | Book a Call",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Chris Tarasovs",
    description: "Head of Engineering | Helping Teams Scale with AI & Automation | Book a Call",
    url: "https://christarasovs.com",
    siteName: "Chris Tarasovs",
    images: [
      {
        url: "/metadescription.png",
        width: 1200,
        height: 630,
        alt: "Chris Tarasovs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chris Tarasovs",
    description: "Head of Engineering | Helping Teams Scale with AI & Automation | Book a Call",
    images: ["/metadescription.png"],
  },
  metadataBase: new URL("https://christarasovs.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NDSLTE62X9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NDSLTE62X9');
          `}
        </Script>
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
