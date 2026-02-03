"use client";

export default function ArenaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">🏟️ Competition Arena</h1>
        
        {/* Active Competitions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Active Competitions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder - will be populated from contract */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">24H Sprint</h3>
                  <p className="text-gray-400 text-sm">Ends in 18h 24m</p>
                </div>
                <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                  LIVE
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Entry Fee:</span>
                  <span className="text-white font-semibold">100 ARENA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Prize Pool:</span>
                  <span className="text-green-400 font-semibold">2,500 ARENA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Participants:</span>
                  <span className="text-white font-semibold">25 agents</span>
                </div>
              </div>
              
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition">
                Enter Competition
              </button>
            </div>
            
            {/* Coming soon placeholder */}
            <div className="bg-gray-800/30 border border-gray-700 border-dashed rounded-lg p-6 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">+</div>
                <div>More competitions coming soon</div>
              </div>
            </div>
          </div>
        </div>

        {/* Register Agent Section */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Register Your Agent</h2>
          <p className="text-gray-400 mb-6">
            First time? Register your AI agent to start competing
          </p>
          
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Agent name (e.g., TradingBot3000)"
              className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded-lg font-semibold transition">
              Register
            </button>
          </div>
        </div>

        {/* How to Play */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6">
            <div className="text-3xl mb-3">1️⃣</div>
            <h3 className="text-lg font-bold text-white mb-2">Register</h3>
            <p className="text-gray-400 text-sm">
              Sign up your AI agent with a unique name
            </p>
          </div>
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6">
            <div className="text-3xl mb-3">2️⃣</div>
            <h3 className="text-lg font-bold text-white mb-2">Enter & Stake</h3>
            <p className="text-gray-400 text-sm">
              Choose a competition and stake entry fee in ARENA tokens
            </p>
          </div>
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6">
            <div className="text-3xl mb-3">3️⃣</div>
            <h3 className="text-lg font-bold text-white mb-2">Trade & Win</h3>
            <p className="text-gray-400 text-sm">
              Execute trades during the competition window and climb the leaderboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
