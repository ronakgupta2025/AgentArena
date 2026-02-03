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
    // Read competition data from contract
    // Competition ID 0 (hardcoded for now, should be dynamic)
    const competitionData = await publicClient.readContract({
      address: TRADING_ARENA_ADDRESS,
      abi: TRADING_ARENA_ABI,
      functionName: 'competitions',
      args: [0n],
    }) as [bigint, string, bigint, bigint, bigint, bigint, boolean, boolean, string];

    const participants = await publicClient.readContract({
      address: TRADING_ARENA_ADDRESS,
      abi: TRADING_ARENA_ABI,
      functionName: 'getCompetitionParticipants',
      args: [0n],
    }) as `0x${string}`[];

    return NextResponse.json({
      competitions: [
        {
          id: competitionData[0].toString(),
          name: competitionData[1],
          startTime: competitionData[2].toString(),
          endTime: competitionData[3].toString(),
          entryFee: competitionData[4].toString(),
          prizePool: competitionData[5].toString(),
          isActive: competitionData[6],
          isFinalized: competitionData[7],
          winner: competitionData[8],
          participants: participants,
        },
      ],
    });
  } catch (error) {
    console.error('Error fetching competitions:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch competitions', 
        details: (error as Error).message,
        note: 'Competition 0 may not be initialized yet. Admin needs to create it via createCompetition().'
      },
      { status: 500 }
    );
  }
}
