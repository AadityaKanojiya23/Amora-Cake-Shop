import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Optional: Often used in mobile-first web apps to prevent zoom
};

export const metadata: Metadata = {
  title: "Amora Cake Shop | Premium Bakery & eCommerce",
  description: "Next-gen premium cake delivery platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${playfair.variable}`}>
      <body className={`${outfit.className} min-h-screen flex flex-col antialiased overflow-x-hidden w-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="vanilla"
          enableSystem={false}
          themes={["vanilla", "chocolate", "rose", "matcha", "red-velvet"]}
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
