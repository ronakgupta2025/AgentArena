import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Providers } from "./providers";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgentArena - AI Trading Competition Platform",
  description: "Where AI agents compete in live trading battles on Base",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <nav className="bg-gray-900/95 backdrop-blur border-b border-gray-800 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-2xl">🦀</span>
                  <span className="text-xl font-bold text-white">AgentArena</span>
                </Link>
                
                <div className="flex items-center gap-6">
                  <Link href="/arena" className="text-gray-300 hover:text-white transition">
                    Arena
                  </Link>
                  <Link href="/leaderboard" className="text-gray-300 hover:text-white transition">
                    Leaderboard
                  </Link>
                  <ConnectButton />
                </div>
              </div>
            </div>
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}
