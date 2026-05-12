import { Link } from 'react-router-dom';
import { tilesMetadata } from '../data/tiles-metadata';

const tileRoutes: Record<string, string> = {
  'inbox-triage': '/triage',
  'standup-concierge': '/standup',
  'pr-review-brief': '/pr-review',
  'calendar-choreographer': '/calendar',
  'knowledge-tender': '/knowledge',
  'revenue-pulse': '/revenue',
  'lead-warmer': '/leads',
};

export default function Tiles() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream to-primary-soft/30 dark:from-ink dark:via-surface dark:to-surface-container py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 mb-6">
            <span className="text-label-sm font-semibold text-primary-deep dark:text-primary-soft">✨ AI WORKFLOWS FOR GOOGLE WORKSPACE</span>
          </div>
          <h1 className="font-display text-display-lg text-ink dark:text-on-surface mb-3">
            Workflows that work while you sleep.
          </h1>
          <p className="text-body-lg text-ink-soft dark:text-on-surface-variant max-w-2xl mx-auto">
            Pick a workflow. Connect your Google account. Get results. Pay only when a workflow delivers — no subscriptions, no commitments.
          </p>
        </div>

        {/* Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tilesMetadata.map((tile) => {
            const route = tileRoutes[tile.slug] || '/tiles';
            const price = (tile as any).priceCents ?? 499;

            return (
              <Link
                key={tile.slug}
                to={route}
                className="group relative rounded-2xl border-2 border-border dark:border-surface-container-high bg-cream-elev/80 dark:bg-surface-container-low hover:border-primary/30 dark:hover:border-primary/20 hover:shadow-md transition-all duration-300"
              >
                <div className="p-6">
                  {/* Name + Emoji */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-lg font-semibold text-ink dark:text-on-surface">{tile.name}</h3>
                    <span className="text-2xl opacity-60 group-hover:opacity-100 transition">✨</span>
                  </div>

                  {/* Tagline */}
                  <p className="text-body-sm font-medium text-primary-deep dark:text-primary-soft mb-4">
                    {tile.tagline}
                  </p>

                  {/* Real-world example */}
                  <div className="mb-5 p-3 rounded-lg bg-cream-veil dark:bg-surface-container-low">
                    <p className="text-body-xs text-ink-muted dark:text-on-surface-variant italic leading-relaxed">
                      &ldquo;{tile.example}&rdquo;
                    </p>
                  </div>

                  {/* Integrations */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {tile.integrations.map(int => (
                      <span
                        key={int.name}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 dark:bg-primary/15 text-body-xs font-medium text-ink-soft dark:text-on-surface-variant"
                      >
                        <span>{int.emoji}</span>
                        {int.name}
                      </span>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="pt-4 border-t border-border dark:border-surface-container-high">
                    <div className="flex justify-between items-center">
                      <span className="text-body-sm text-ink-muted dark:text-on-surface-variant">Per successful run</span>
                      <span className="font-display text-headline-sm font-bold text-ink dark:text-on-surface">
                        ${price / 100}
                      </span>
                    </div>
                    <div className="mt-4">
                      <span className="w-full block text-center py-3 rounded-xl bg-primary text-on-primary font-display font-semibold hover:brightness-110 active:scale-[0.98] transition-all shadow-sm shadow-primary/20">
                        Run {tile.name} →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="text-center py-12">
          <p className="text-body-lg text-ink-muted dark:text-on-surface-variant">
            Each workflow runs independently. You only pay when it delivers results. 💰
          </p>
        </div>
      </div>
    </div>
  );
}
