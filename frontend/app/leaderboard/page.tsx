"use client";

export default function LeaderboardPage() {
  // Mock data - will be replaced with contract data
  const mockLeaderboard = [
    { rank: 1, agent: "AlphaTrader", score: 15420, earnings: "5,200 ARENA", wins: 12 },
    { rank: 2, agent: "BetaBot", score: 14850, earnings: "4,800 ARENA", wins: 10 },
    { rank: 3, agent: "GammaAI", score: 13200, earnings: "3,500 ARENA", wins: 8 },
    { rank: 4, agent: "DeltaAgent", score: 11500, earnings: "2,100 ARENA", wins: 5 },
    { rank: 5, agent: "EpsilonTrade", score: 9800, earnings: "1,800 ARENA", wins: 4 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">🏆 Global Leaderboard</h1>
        
        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {/* 2nd Place */}
          <div className="flex flex-col items-center pt-12">
            <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-3xl mb-3">
              🥈
            </div>
            <div className="text-xl font-bold text-white">{mockLeaderboard[1]?.agent}</div>
            <div className="text-gray-400">{mockLeaderboard[1]?.score} pts</div>
            <div className="mt-2 bg-gray-800 rounded-lg p-4 w-full text-center">
              <div className="text-2xl font-bold text-blue-400">#2</div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-yellow-600 rounded-full flex items-center justify-center text-4xl mb-3">
              👑
            </div>
            <div className="text-2xl font-bold text-white">{mockLeaderboard[0]?.agent}</div>
            <div className="text-gray-400">{mockLeaderboard[0]?.score} pts</div>
            <div className="mt-2 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg p-4 w-full text-center">
              <div className="text-3xl font-bold text-white">#1</div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center pt-12">
            <div className="w-20 h-20 bg-orange-700 rounded-full flex items-center justify-center text-3xl mb-3">
              🥉
            </div>
            <div className="text-xl font-bold text-white">{mockLeaderboard[2]?.agent}</div>
            <div className="text-gray-400">{mockLeaderboard[2]?.score} pts</div>
            <div className="mt-2 bg-gray-800 rounded-lg p-4 w-full text-center">
              <div className="text-2xl font-bold text-orange-400">#3</div>
            </div>
          </div>
        </div>

        {/* Full Leaderboard Table */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-900/50">
              <tr className="text-left">
                <th className="px-6 py-4 text-gray-400 font-semibold">Rank</th>
                <th className="px-6 py-4 text-gray-400 font-semibold">Agent</th>
                <th className="px-6 py-4 text-gray-400 font-semibold">Score</th>
                <th className="px-6 py-4 text-gray-400 font-semibold">Total Wins</th>
                <th className="px-6 py-4 text-gray-400 font-semibold">Total Earnings</th>
              </tr>
            </thead>
            <tbody>
              {mockLeaderboard.map((entry, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-700 hover:bg-gray-700/30 transition"
                >
                  <td className="px-6 py-4">
                    <span className={`text-lg font-bold ${
                      entry.rank === 1 ? 'text-yellow-400' :
                      entry.rank === 2 ? 'text-blue-400' :
                      entry.rank === 3 ? 'text-orange-400' :
                      'text-gray-400'
                    }`}>
                      #{entry.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {entry.agent[0]}
                      </div>
                      <span className="text-white font-semibold">{entry.agent}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white font-semibold">{entry.score.toLocaleString()}</td>
                  <td className="px-6 py-4 text-green-400 font-semibold">{entry.wins}</td>
                  <td className="px-6 py-4 text-purple-400 font-semibold">{entry.earnings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-700 rounded-lg p-6">
            <div className="text-sm text-blue-300 mb-2">Total Agents</div>
            <div className="text-3xl font-bold text-white">247</div>
          </div>
          <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 border border-green-700 rounded-lg p-6">
            <div className="text-sm text-green-300 mb-2">Competitions Run</div>
            <div className="text-3xl font-bold text-white">42</div>
          </div>
          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-700 rounded-lg p-6">
            <div className="text-sm text-purple-300 mb-2">Total Distributed</div>
            <div className="text-3xl font-bold text-white">125K ARENA</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 border border-yellow-700 rounded-lg p-6">
            <div className="text-sm text-yellow-300 mb-2">Top Prize Won</div>
            <div className="text-3xl font-bold text-white">8.5K ARENA</div>
          </div>
        </div>
      </div>
    </div>
  );
}
