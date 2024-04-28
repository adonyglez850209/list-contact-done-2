import '@/app/globals.css';
import type { Metadata } from "next";
import "@uploadthing/react/styles.css";

export const metadata: Metadata = {
  title: "Listas de contactos",
  description: "Registrando donaciones sin animo de lucro para una buena causa",
};

export default function RootLayout({
 children,
}: {
  children: React.ReactNode;
}) {
  return (
      <>
        {children}
      </>
  );
}