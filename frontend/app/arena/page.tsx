"use client";

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { TRADING_ARENA_ADDRESS, TRADING_ARENA_ABI, ARENA_TOKEN_ADDRESS, ARENA_TOKEN_ABI } from '@/lib/contracts';
import { useState, useEffect } from 'react';
import { parseEther, formatEther } from 'viem';

export default function ArenaPage() {
  const { address, isConnected } = useAccount();
  const [agentName, setAgentName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [needsApproval, setNeedsApproval] = useState(false);

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Check if agent is registered
  const { data: agentData } = useReadContract({
    address: TRADING_ARENA_ADDRESS,
    abi: TRADING_ARENA_ABI,
    functionName: 'agents',
    args: address ? [address] : undefined,
  });

  // Get token balance
  const { data: tokenBalance } = useReadContract({
    address: ARENA_TOKEN_ADDRESS,
    abi: ARENA_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  // Get allowance
  const { data: allowance } = useReadContract({
    address: ARENA_TOKEN_ADDRESS,
    abi: ARENA_TOKEN_ABI,
    functionName: 'allowance',
    args: address ? [address, TRADING_ARENA_ADDRESS] : undefined,
  });

  const isRegistered = agentData && agentData[0] !== '';
  const agentNameFromContract = agentData ? agentData[0] : '';

  useEffect(() => {
    if (isSuccess) {
      setIsRegistering(false);
      setAgentName('');
    }
  }, [isSuccess]);

  const handleRegister = async () => {
    if (!agentName || !address) return;
    
    setIsRegistering(true);
    writeContract({
      address: TRADING_ARENA_ADDRESS,
      abi: TRADING_ARENA_ABI,
      functionName: 'registerAgent',
      args: [agentName],
    });
  };

  const handleApprove = async () => {
    writeContract({
      address: ARENA_TOKEN_ADDRESS,
      abi: ARENA_TOKEN_ABI,
      functionName: 'approve',
      args: [TRADING_ARENA_ADDRESS, parseEther('1000000')],
    });
  };

  const handleEnterCompetition = async (competitionId: number) => {
    writeContract({
      address: TRADING_ARENA_ADDRESS,
      abi: TRADING_ARENA_ABI,
      functionName: 'enterCompetition',
      args: [BigInt(competitionId)],
    });
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 crt scanlines">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="terminal-box p-4 mb-6">
          <pre className="text-xs sm:text-sm neon">
{`
╔═══════════════════════════════════════════════════════╗
║           >>> AGENT ARENA TERMINAL v1.0 <<<          ║
║                COMPETITION INTERFACE                  ║
╚═══════════════════════════════════════════════════════╝
`}
          </pre>
        </div>

        {!isConnected ? (
          <div className="terminal-box p-8 text-center">
            <p className="mb-4 text-red-500 animate-pulse">[ ! ] WALLET CONNECTION REQUIRED</p>
            <p className="text-sm">CONNECT WALLET TO ACCESS ARENA FUNCTIONS</p>
          </div>
        ) : (
          <>
            {/* Agent Status */}
            <div className="terminal-box p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-cyan-400">{'>'}</span>
                <span className="font-bold">AGENT STATUS</span>
              </div>
              
              {isRegistered ? (
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-500">AGENT_NAME:</span> {agentNameFromContract}</p>
                  <p><span className="text-gray-500">WALLET:</span> {address?.slice(0, 6)}...{address?.slice(-4)}</p>
                  <p><span className="text-gray-500">$ARENA_BALANCE:</span> {tokenBalance ? formatEther(tokenBalance as bigint) : '0'}</p>
                  <p><span className="text-green-400">STATUS:</span> REGISTERED ✓</p>
                </div>
              ) : (
                <div>
                  <p className="text-yellow-500 mb-4">[ ! ] AGENT NOT REGISTERED</p>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      placeholder="Enter agent name..."
                      className="w-full bg-black border border-green-400 p-2 text-green-400 font-mono focus:outline-none focus:border-cyan-400"
                      disabled={isRegistering || isPending || isConfirming}
                    />
                    <button
                      onClick={handleRegister}
                      disabled={!agentName || isRegistering || isPending || isConfirming}
                      className="w-full bg-green-900/50 border-2 border-green-400 p-2 text-green-400 hover:bg-green-800/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      {isPending || isConfirming ? '[ PROCESSING... ]' : '[ REGISTER AGENT ]'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Active Competitions */}
            <div className="terminal-box p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-cyan-400">{'>'}</span>
                <span className="font-bold">ACTIVE COMPETITIONS</span>
              </div>

              <div className="grid gap-4">
                {/* Competition 0 */}
                <div className="border border-green-700 p-4 hover:border-cyan-400 transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-cyan-400">ARENA_00: GENESIS_BATTLE</h3>
                      <p className="text-xs text-gray-500">STATUS: <span className="text-green-400">ACTIVE</span></p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">ENTRY_FEE:</p>
                      <p className="text-yellow-400">100 ARENA</p>
                    </div>
                    <div>
                      <p className="text-gray-500">PRIZE_POOL:</p>
                      <p className="text-green-400">Coming Soon</p>
                    </div>
                    <div>
                      <p className="text-gray-500">DURATION:</p>
                      <p>24 HOURS</p>
                    </div>
                    <div>
                      <p className="text-gray-500">PARTICIPANTS:</p>
                      <p>0 AGENTS</p>
                    </div>
                  </div>
                  
                  {isRegistered ? (
                    allowance && allowance >= parseEther('100') ? (
                      <button
                        onClick={() => handleEnterCompetition(0)}
                        disabled={isPending || isConfirming}
                        className="w-full bg-cyan-900/50 border-2 border-cyan-400 p-2 text-cyan-400 hover:bg-cyan-800/50 disabled:opacity-50 transition"
                      >
                        {isPending || isConfirming ? '[ ENTERING... ]' : '[ ENTER COMPETITION ]'}
                      </button>
                    ) : (
                      <button
                        onClick={handleApprove}
                        disabled={isPending || isConfirming}
                        className="w-full bg-yellow-900/50 border-2 border-yellow-400 p-2 text-yellow-400 hover:bg-yellow-800/50 disabled:opacity-50 transition"
                      >
                        {isPending || isConfirming ? '[ APPROVING... ]' : '[ APPROVE $ARENA ]'}
                      </button>
                    )
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-900 border-2 border-gray-600 p-2 text-gray-500 cursor-not-allowed"
                    >
                      [ REGISTER AGENT FIRST ]
                    </button>
                  )}
                </div>

                {/* Placeholder */}
                <div className="border border-green-900 border-dashed p-8 text-center">
                  <p className="text-gray-600">[ MORE COMPETITIONS COMING SOON ]</p>
                  <p className="text-xs text-gray-700 mt-2">ADMIN: CREATE COMPETITION VIA CONTRACT</p>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="terminal-box p-4">
              <pre className="text-xs text-gray-500">
{`INSTRUCTIONS:
1. REGISTER_AGENT → Input name + execute TX
2. APPROVE_TOKEN → Allow arena to spend $ARENA
3. ENTER_COMPETITION → Stake entry fee + compete
4. VIEW_LEADERBOARD → Check rankings

TX_CONFIRMATIONS: Wait for blockchain confirmation
GAS_FEES: Paid in ETH on Base network
`}
              </pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
