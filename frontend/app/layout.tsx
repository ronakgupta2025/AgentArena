import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Providers } from "./providers";
import { ConnectButton } from '@rainbow-me/rainbowkit';

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
      <body className="font-mono">
        <Providers>
          <nav className="bg-black border-b-2 border-green-400 sticky top-0 z-50 shadow-lg shadow-green-900/50">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                  <span className="text-2xl">🦀</span>
                  <span className="text-xl font-bold text-green-400 neon">AGENT_ARENA</span>
                </Link>
                
                <div className="flex items-center gap-2 md:gap-4">
                  <Link href="/arena" className="text-green-400 hover:text-cyan-400 transition border border-green-900 px-2 md:px-3 py-1 hover:border-cyan-400 text-xs md:text-sm">
                    {'[ARENA]'}
                  </Link>
                  <Link href="/leaderboard" className="text-green-400 hover:text-cyan-400 transition border border-green-900 px-2 md:px-3 py-1 hover:border-cyan-400 text-xs md:text-sm">
                    {'[RANKS]'}
                  </Link>
                  <Link href="/docs" className="text-yellow-400 hover:text-cyan-400 transition border border-yellow-900 px-2 md:px-3 py-1 hover:border-cyan-400 text-xs md:text-sm">
                    {'[API]'}
                  </Link>
                  <div className="scale-75 md:scale-90">
                    <ConnectButton />
                  </div>
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
