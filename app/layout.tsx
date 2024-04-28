import type { Metadata } from "next";
import { inter } from '@/app/fonts'
import "@/app/globals.css";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Header from '@/app/ui/comunes/header'
import Footer from '@/app/ui/comunes/footer';
import { AuthProvider } from "@/app/providers";

export const metadata: Metadata = {
  title: "Listas de contactos",
  description: "Aportando y colaborando con donaciones sin animo de lucro por una buena causa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${inter.className} antialiased`}>      
      <Suspense fallback="Loading...">
        <Header />
      </Suspense>
        <AuthProvider>
          <Toaster />
          {children}
        </AuthProvider>
      <Footer />
    </body>
  </html>
  );
}
