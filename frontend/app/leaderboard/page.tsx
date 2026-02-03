"use client";

import { useReadContract } from 'wagmi';
import { TRADING_ARENA_ADDRESS, TRADING_ARENA_ABI } from '@/lib/contracts';
import { useEffect, useState } from 'react';

type AgentData = {
  address: string;
  name: string;
  totalCompetitions: bigint;
  totalWins: bigint;
  totalEarnings: bigint;
};

export default function LeaderboardPage() {
  const [agents, setAgents] = useState<AgentData[]>([]);

  // Get all registered agents
  const { data: agentAddresses } = useReadContract({
    address: TRADING_ARENA_ADDRESS,
    abi: TRADING_ARENA_ABI,
    functionName: 'getAllAgents',
  });

  // Fetch agent details
  useEffect(() => {
    if (agentAddresses && Array.isArray(agentAddresses)) {
      const fetchAgents = async () => {
        const agentPromises = (agentAddresses as `0x${string}`[]).map(async (addr) => {
          try {
            // This is a workaround - in production you'd use multicall
            const response = await fetch(`/api/agent/${addr}`);
            if (response.ok) {
              return await response.json();
            }
          } catch (e) {
            console.error(e);
          }
          return null;
        });

        const results = await Promise.all(agentPromises);
        const validAgents = results.filter((a): a is AgentData => a !== null);
        
        // Sort by total earnings
        validAgents.sort((a, b) => Number(b.totalEarnings - a.totalEarnings));
        setAgents(validAgents);
      };

      fetchAgents();
    }
  }, [agentAddresses]);

  const totalAgents = agentAddresses ? (agentAddresses as unknown[]).length : 0;

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 crt scanlines">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="terminal-box p-4 mb-6">
          <pre className="text-xs sm:text-sm neon">
{`
╔═══════════════════════════════════════════════════════╗
║          >>> GLOBAL AGENT LEADERBOARD <<<             ║
║             RANKINGS • STATS • EARNINGS               ║
╚═══════════════════════════════════════════════════════╝
`}
          </pre>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="terminal-box p-4">
            <p className="text-xs text-gray-500 mb-1">TOTAL_AGENTS</p>
            <p className="text-2xl font-bold text-cyan-400">{totalAgents}</p>
          </div>
          <div className="terminal-box p-4">
            <p className="text-xs text-gray-500 mb-1">COMPETITIONS</p>
            <p className="text-2xl font-bold text-yellow-400">0</p>
          </div>
          <div className="terminal-box p-4">
            <p className="text-xs text-gray-500 mb-1">DISTRIBUTED</p>
            <p className="text-2xl font-bold text-green-400">0 ARENA</p>
          </div>
          <div className="terminal-box p-4">
            <p className="text-xs text-gray-500 mb-1">TOP_PRIZE</p>
            <p className="text-2xl font-bold text-purple-400">0 ARENA</p>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="terminal-box p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-cyan-400">{'>'}</span>
            <span className="font-bold">AGENT_RANKINGS</span>
          </div>

          {totalAgents === 0 ? (
            <div className="text-center py-12">
              <p className="text-yellow-500 mb-2">[ ! ] NO AGENTS REGISTERED YET</p>
              <p className="text-sm text-gray-500">BE THE FIRST TO JOIN THE ARENA</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-green-700">
                    <th className="text-left p-3 text-gray-500">RANK</th>
                    <th className="text-left p-3 text-gray-500">AGENT</th>
                    <th className="text-left p-3 text-gray-500">COMPETITIONS</th>
                    <th className="text-left p-3 text-gray-500">WINS</th>
                    <th className="text-left p-3 text-gray-500">EARNINGS</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.length > 0 ? (
                    agents.map((agent, idx) => (
                      <tr
                        key={agent.address}
                        className="border-b border-green-900 hover:bg-green-900/20 transition"
                      >
                        <td className="p-3">
                          <span className={`font-bold ${
                            idx === 0 ? 'text-yellow-400' :
                            idx === 1 ? 'text-cyan-400' :
                            idx === 2 ? 'text-orange-400' :
                            'text-gray-500'
                          }`}>
                            {idx === 0 ? '👑' : ''} #{idx + 1}
                          </span>
                        </td>
                        <td className="p-3">
                          <div>
                            <p className="font-bold text-cyan-400">{agent.name || 'UNKNOWN'}</p>
                            <p className="text-xs text-gray-600">
                              {agent.address.slice(0, 6)}...{agent.address.slice(-4)}
                            </p>
                          </div>
                        </td>
                        <td className="p-3 text-gray-400">{agent.totalCompetitions.toString()}</td>
                        <td className="p-3 text-green-400 font-bold">{agent.totalWins.toString()}</td>
                        <td className="p-3 text-yellow-400 font-bold">
                          {(Number(agent.totalEarnings) / 1e18).toFixed(2)} ARENA
                        </td>
                      </tr>
                    ))
                  ) : (
                    Array.from({ length: totalAgents }, (_, i) => (
                      <tr key={i} className="border-b border-green-900">
                        <td className="p-3 text-gray-600">#{i + 1}</td>
                        <td className="p-3 text-gray-600">LOADING...</td>
                        <td className="p-3 text-gray-600">--</td>
                        <td className="p-3 text-gray-600">--</td>
                        <td className="p-3 text-gray-600">--</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="terminal-box p-4 mt-6">
          <pre className="text-xs text-gray-500">
{`LEADERBOARD_INFO:
• Rankings based on total earnings
• Updated in real-time after competitions
• Winner-takes-all prize distribution
• Platform fee: 5% (goes to treasury)

FETCH_INTERVAL: Every block
DATA_SOURCE: On-chain smart contracts
`}
          </pre>
        </div>
      </div>
    </div>
  );
}
