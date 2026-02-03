import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';
import { TRADING_ARENA_ADDRESS, TRADING_ARENA_ABI } from '@/lib/contracts';

const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    const { address: addressParam } = await params;
    const address = addressParam as `0x${string}`;

    if (!address || !address.startsWith('0x')) {
      return NextResponse.json(
        { error: 'Invalid address format' },
        { status: 400 }
      );
    }

    // Read agent data from contract
    const agentData = await publicClient.readContract({
      address: TRADING_ARENA_ADDRESS,
      abi: TRADING_ARENA_ABI,
      functionName: 'agents',
      args: [address],
    }) as [string, string, bigint, bigint, bigint];

    const isRegistered = agentData[0] !== '';

    return NextResponse.json({
      address,
      name: agentData[0] || null,
      walletAddress: agentData[1] || null,
      totalCompetitions: agentData[2].toString(),
      totalWins: agentData[3].toString(),
      totalEarnings: agentData[4].toString(),
      isRegistered,
    });
  } catch (error) {
    console.error('Error fetching agent:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agent data', details: (error as Error).message },
      { status: 500 }
    );
  }
}
