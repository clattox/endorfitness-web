import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// METADATOS PERSONALIZADOS PARA SEO
export const metadata: Metadata = {
  title: 'Endorfitness | Entrenamiento Inteligente en Cañete',
  description: 'Studio de entrenamiento funcional, personalizado y kickboxing en Cañete. Potencia tu mente y entrena tu cuerpo con expertos.',
  keywords: ['Gimnasio Cañete', 'Kickboxing Cañete', 'Entrenamiento Funcional', 'Endorfitness'],
  openGraph: {
    title: 'Endorfitness Cañete',
    description: 'Entrenamiento de alto rendimiento y bienestar.',
    images: [
      {
        url: '/Images/gym-local.jpeg', // Imagen que aparecerá al compartir el link
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es" // Cambiado a español para mejorar el posicionamiento local
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}