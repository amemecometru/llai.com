import { useState } from 'react';

export default function Dashboard() {
  const [_loading] = useState(true);

  return (
    <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-display-xl font-display text-ink">Dashboard</h1>
          <p className="mt-2 font-body-lg text-ink-soft">
            Track your workflow runs, usage, and connected integrations.
          </p>
        </div>
        <div className="text-center py-12 font-body text-ink-muted">
          Dashboard data requires a live backend. This page is ready for API wiring.
        </div>
      </div>
    </div>
  );
}
