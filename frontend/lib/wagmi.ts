import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'AgentArena',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '0000000000000000000000000000000', // Get from https://cloud.walletconnect.com
  chains: [base],
  ssr: true,
});
