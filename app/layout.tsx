import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.css";

export const metadata: Metadata = {
    title: "Kotoba",
    description: "Flashcard Kanji Kotoba",
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout(props: Readonly<RootLayoutProps>) {
    return (
        <html lang="en">
            <body className="antialiased">{props.children}</body>
        </html>
    );
}
