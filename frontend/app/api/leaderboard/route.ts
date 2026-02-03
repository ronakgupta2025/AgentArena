import { NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';
import { TRADING_ARENA_ADDRESS, TRADING_ARENA_ABI } from '@/lib/contracts';

const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

export async function GET() {
  try {
    // Get all registered agents
    const agentAddresses = await publicClient.readContract({
      address: TRADING_ARENA_ADDRESS,
      abi: TRADING_ARENA_ABI,
      functionName: 'getAllAgents',
    }) as `0x${string}`[];

    // Fetch details for each agent
    const agentDataPromises = agentAddresses.map(async (address) => {
      const data = await publicClient.readContract({
        address: TRADING_ARENA_ADDRESS,
        abi: TRADING_ARENA_ABI,
        functionName: 'agents',
        args: [address],
      }) as [string, string, bigint, bigint, bigint];

      return {
        address,
        name: data[0],
        totalCompetitions: data[2].toString(),
        totalWins: data[3].toString(),
        totalEarnings: data[4].toString(),
      };
    });

    const agents = await Promise.all(agentDataPromises);

    // Sort by total earnings (descending)
    agents.sort((a, b) => {
      const earningsA = BigInt(a.totalEarnings);
      const earningsB = BigInt(b.totalEarnings);
      return earningsB > earningsA ? 1 : -1;
    });

    // Add rank
    const rankedAgents = agents.map((agent, index) => ({
      rank: index + 1,
      ...agent,
    }));

    return NextResponse.json({
      totalAgents: agents.length,
      agents: rankedAgents,
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard', details: (error as Error).message },
      { status: 500 }
    );
  }
}
