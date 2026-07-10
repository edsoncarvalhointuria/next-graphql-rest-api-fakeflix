import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
    variable: "--font-bebas",
    subsets: ["latin"],
    weight: "400",
});

export const metadata: Metadata = {
    title: "Fakeflix API",
    description: "REST & GRAPHQL, o melhor dos dois mundos!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" className={`${bebasNeue.variable}`}>
            <body>{children}</body>
        </html>
    );
}
