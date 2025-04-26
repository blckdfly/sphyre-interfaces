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

export const metadata: Metadata = {
    title: "Sphyre App",
    description: "Decentralized Identity for Official Documents",
    manifest: "/manifest.json",
    icons: {
        icon: [
            { url: '/assets/sphyre-logo.svg', sizes: 'any' },
            { url: '/icons/icons192', sizes: '16x16', type: 'image/png' },
            { url: '/icons/icons512', sizes: '32x32', type: 'image/png' },
        ],
        apple: {
            url: '/assets/sphyre-logo.svg',
            sizes: '180x180',
            type: 'image/svg',
        },
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        </body>
        </html>
    );
}