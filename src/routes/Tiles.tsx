import { useState } from 'react';

const tiles = [
  { slug: 'inbox-triage', name: 'Inbox Triage', status: 'live', description: 'AI-powered email classification and actionable item surfacing.' },
  { slug: 'standup-concierge', name: 'Standup Concierge', status: 'live', description: 'Automated standup summaries from Slack and GitHub activity.' },
  { slug: 'pr-review-brief', name: 'PR Review Brief', status: 'live', description: 'Concise review briefs for pull requests with key insights.' },
  { slug: 'calendar-choreographer', name: 'Calendar Choreographer', status: 'live', description: 'Smart calendar management with meeting briefs and prep.' },
  { slug: 'knowledge-tender', name: 'Knowledge Tender', status: 'live', description: 'Notion-powered knowledge capture and synthesis.' },
  { slug: 'revenue-pulse', name: 'Revenue Pulse', status: 'live', description: 'Stripe revenue metrics and subscription insights.' },
  { slug: 'lead-warmer', name: 'Lead Warmer', status: 'live', description: 'LinkedIn lead enrichment and outreach automation.' },
];

export default function Tiles() {
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>({});

  const handleInputChange = (tileSlug: string, value: string) => {
    setInputs(prev => ({ ...prev, [tileSlug]: value }));
  };

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
              className="relative bg-white rounded-2xl shadow-sm border border-blue-200 hover:shadow-lg cursor-pointer transition-all"
              onClick={() => setSelectedTile(tile.slug)}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tile.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{tile.description}</p>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
                  Open Tile →
                </button>
              </div>
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
              {/* Inbox Triage Inputs */}
              {selectedTile === 'inbox-triage' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Window</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={inputs['inbox-triage'] || ''}
                      onChange={(e) => handleInputChange('inbox-triage', e.target.value)}
                    >
                      <option value="">Select window...</option>
                      <option value="24h">Last 24 hours</option>
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                    </select>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                    Run Inbox Triage
                  </button>
                </>
              )}

              {/* Standup Concierge Inputs */}
              {selectedTile === 'standup-concierge' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slack Channel</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="#general"
                      value={inputs['standup-channel'] || ''}
                      onChange={(e) => handleInputChange('standup-channel', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Repo</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="owner/repo"
                      value={inputs['standup-repo'] || ''}
                      onChange={(e) => handleInputChange('standup-repo', e.target.value)}
                    />
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                    Generate Standup
                  </button>
                </>
              )}

              {/* PR Review Brief Inputs */}
              {selectedTile === 'pr-review-brief' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Repository</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="owner/repo"
                      value={inputs['pr-repo'] || ''}
                      onChange={(e) => handleInputChange('pr-repo', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PR Number (optional)</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Leave empty for all open PRs"
                      value={inputs['pr-number'] || ''}
                      onChange={(e) => handleInputChange('pr-number', e.target.value)}
                    />
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                    Generate PR Brief
                  </button>
                </>
              )}

              {/* Calendar Choreographer Inputs */}
              {selectedTile === 'calendar-choreographer' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Calendar</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={inputs['cal-calendar'] || ''}
                      onChange={(e) => handleInputChange('cal-calendar', e.target.value)}
                    >
                      <option value="">Select calendar...</option>
                      <option value="primary">Primary</option>
                      <option value="work">Work</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={inputs['cal-range'] || ''}
                      onChange={(e) => handleInputChange('cal-range', e.target.value)}
                    >
                      <option value="today">Today</option>
                      <option value="tomorrow">Tomorrow</option>
                      <option value="week">Next 7 days</option>
                    </select>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                    Generate Briefs
                  </button>
                </>
              )}

              {/* Knowledge Tender Inputs */}
              {selectedTile === 'knowledge-tender' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notion Database</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={inputs['know-db'] || ''}
                      onChange={(e) => handleInputChange('know-db', e.target.value)}
                    >
                      <option value="">Select database...</option>
                      <option value="docs">Documentation</option>
                      <option value="wiki">Wiki</option>
                    </select>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                    Sync Knowledge
                  </button>
                </>
              )}

              {/* Revenue Pulse Inputs */}
              {selectedTile === 'revenue-pulse' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={inputs['rev-type'] || ''}
                      onChange={(e) => handleInputChange('rev-type', e.target.value)}
                    >
                      <option value="">Select report...</option>
                      <option value="monthly">Monthly Summary</option>
                      <option value="ytd">Year to Date</option>
                    </select>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                    View Revenue
                  </button>
                </>
              )}

              {/* Lead Warmer Inputs */}
              {selectedTile === 'lead-warmer' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile URL</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="https://www.linkedin.com/in/..."
                      value={inputs['lead-url'] || ''}
                      onChange={(e) => handleInputChange('lead-url', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Outreach Template</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={inputs['lead-template'] || ''}
                      onChange={(e) => handleInputChange('lead-template', e.target.value)}
                    >
                      <option value="">Select template...</option>
                      <option value="intro">Introduction</option>
                      <option value="followup">Follow Up</option>
                    </select>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                    Enrich & Draft
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
