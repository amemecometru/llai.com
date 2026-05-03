import { useState } from 'react';

const tiles = [
  { slug: 'inbox-triage', name: 'Inbox Triage', status: 'live', description: 'AI-powered email classification and actionable item surfacing.' },
  { slug: 'standup-concierge', name: 'Standup Concierge', status: 'coming-soon', description: 'Automated standup summaries from Slack and GitHub activity.' },
  { slug: 'pr-review-brief', name: 'PR Review Brief', status: 'coming-soon', description: 'Concise review briefs for pull requests with key insights.' },
  { slug: 'calendar-choreographer', name: 'Calendar Choreographer', status: 'coming-soon', description: 'Smart calendar management with meeting briefs and prep.' },
  { slug: 'knowledge-tender', name: 'Knowledge Tender', status: 'coming-soon', description: 'Notion-powered knowledge capture and synthesis.' },
  { slug: 'revenue-pulse', name: 'Revenue Pulse', status: 'coming-soon', description: 'Stripe revenue metrics and subscription insights.' },
  { slug: 'lead-warmer', name: 'Lead Warmer', status: 'coming-soon', description: 'LinkedIn lead enrichment and outreach automation.' },
];

export default function Tiles() {
  const [selectedTile, setSelectedTile] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">LLai Tile Gallery</h1>
          <p className="text-lg text-gray-600">Outcome-based AI services for your business.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiles.map((tile) => (
            <div
              key={tile.slug}
              className={`relative bg-white rounded-2xl shadow-sm border p-6 transition-all ${
                tile.status === 'live' 
                  ? 'border-blue-200 hover:shadow-lg cursor-pointer' 
                  : 'border-gray-200 opacity-60'
              }`}
              onClick={() => tile.status === 'live' && setSelectedTile(tile.slug)}
            >
              {tile.status === 'coming-soon' && (
                <div className="absolute top-4 right-4 bg-gray-100 text-gray-500 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Coming Soon
                </div>
              )}
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{tile.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{tile.description}</p>
              
              {tile.status === 'live' && (
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
                  Open Tile →
                </button>
              )}
            </div>
          ))}
        </div>

        {selectedTile && (
          <div className="mt-12 bg-white rounded-2xl shadow-sm border border-blue-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {tiles.find(t => t.slug === selectedTile)?.name} - Action Panel
            </h2>
            <p className="text-gray-600 mb-6">This tile sells outcomes, not integrations.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Input Mode</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Last 24 hours</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </div>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                Run Tile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
