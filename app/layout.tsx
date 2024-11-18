import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./theme-provider";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "VidSuash | Efficient video compression tool.",
  description: "Utilising the power of ffmpeg.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className=" px-6 md:px-24">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
