import { useState } from 'react';
import { Link } from 'react-router-dom';
import { tilesMetadata } from '../data/tiles-metadata';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tiles() {
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const [inputs, setInputs] = useState<Record<string, string | string[]>>({});

  const handleInputChange = (tileSlug: string, key: string, value: string | string[]) => {
    setInputs(prev => ({
      ...prev,
      [`${tileSlug}:${key}`]: value,
    }));
  };

  const selectedMetadata = tilesMetadata.find(t => t.slug === selectedTile);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tilesMetadata.map((tile) => {
            const isActionable = selectedTile === tile.slug;
            const isInboxTriage = tile.slug === 'inbox-triage';

            return (
              <div
                key={tile.slug}
                className={`group relative rounded-2xl border-2 transition-all duration-300 ${
                  isActionable
                    ? 'border-primary/50 dark:border-primary/30 bg-cream-elev dark:bg-surface-container shadow-lg shadow-primary/5'
                    : 'border-border dark:border-surface-container-high bg-cream-elev/80 dark:bg-surface-container-low hover:border-primary/30 dark:hover:border-primary/20 hover:shadow-md'
                }`}
              >
                <div className="p-6">
                  {/* Name + Emoji indicator */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-lg font-semibold text-ink dark:text-on-surface">{tile.name}</h3>
                    <span className="text-2xl opacity-60 group-hover:opacity-100 transition">✨</span>
                  </div>

                  {/* Tagline (the outcome) */}
                  <p className="text-body-sm font-medium text-primary-deep dark:text-primary-soft mb-3">
                    {tile.tagline}
                  </p>

                  {/* Real-world example */}
                  <div className="mb-4 p-3 rounded-lg bg-cream-veil dark:bg-surface-container-low">
                    <p className="text-body-xs text-ink-muted dark:text-on-surface-variant italic leading-relaxed">
                      &ldquo;{tile.example}&rdquo;
                    </p>
                  </div>

                  {/* Integrations */}
                  <div className="flex flex-wrap gap-2 mb-4">
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

                  {/* Price */}
                  <div className="mb-4 pt-3 border-t border-border dark:border-surface-container-high">
                    <div className="flex justify-between items-center">
                      <span className="text-body-sm text-ink-muted dark:text-on-surface-variant">Per successful run</span>
                      <span className="font-display text-headline-sm font-bold text-ink dark:text-on-surface">
                        ${((tile as any).priceCents ?? 499) / 100}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  {isInboxTriage ? (
                    <Link
                      to="/triage"
                      className="w-full block text-center py-3 rounded-xl bg-primary text-on-primary font-display font-semibold hover:brightness-110 active:scale-[0.98] transition-all shadow-sm shadow-primary/20"
                    >
                      Run Inbox Triage →
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        if (isActionable) {
                          setSelectedTile(null);
                          setInputs({});
                        } else {
                          setSelectedTile(tile.slug);
                        }
                      }}
                      className="w-full py-3 rounded-xl bg-primary text-on-primary font-display font-semibold hover:brightness-110 active:scale-[0.98] transition-all shadow-sm shadow-primary/20"
                    >
                      {isActionable ? 'Hide Details ↑' : 'Run This Workflow →'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Panel for non-triage tiles */}
        {selectedMetadata && selectedMetadata.slug !== 'inbox-triage' && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-cream-elev dark:bg-surface-container rounded-2xl border-2 border-primary/30 dark:border-primary/20 shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-deep px-8 py-8">
              <h2 className="font-display text-3xl font-bold text-on-primary mb-2">{selectedMetadata.name}</h2>
              <p className="text-on-primary/80 text-lg font-medium">{selectedMetadata.tagline}</p>
            </div>

            <div className="p-8 space-y-8">
              {/* What you get */}
              <div>
                <h3 className="text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">What you get</h3>
                <p className="text-body-md text-ink dark:text-on-surface leading-relaxed">{selectedMetadata.whatYouGet}</p>
              </div>

              {/* What it does */}
              <div>
                <h3 className="text-label-sm text-ink-muted dark:text-on-surface-variant mb-2">How it works</h3>
                <p className="text-body-md text-ink dark:text-on-surface leading-relaxed">{selectedMetadata.description}</p>
              </div>

              {/* Inputs */}
              <div className="space-y-4">
                <h3 className="text-label-sm text-ink-muted dark:text-on-surface-variant">Configure your run</h3>
                {selectedMetadata.inputs.map(input => (
                  <div key={input.key}>
                    <label className="block text-body-sm font-medium text-ink dark:text-on-surface mb-1">
                      {input.label}
                      {input.helpText && (
                        <span className="block text-body-xs font-normal text-ink-muted dark:text-on-surface-variant mt-0.5">
                          {input.helpText}
                        </span>
                      )}
                    </label>

                    {input.type === 'select' && input.options && (
                      <select
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition"
                        value={String(inputs[`${selectedTile}:${input.key}`] || '')}
                        onChange={e => handleInputChange(selectedTile, input.key, e.target.value)}
                      >
                        <option value="">Select an option...</option>
                        {input.options.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    )}

                    {input.type === 'text' && (
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition placeholder:text-ink-muted/50"
                        placeholder={input.placeholder}
                        value={String(inputs[`${selectedTile}:${input.key}`] || '')}
                        onChange={e => handleInputChange(selectedTile, input.key, e.target.value)}
                      />
                    )}

                    {input.type === 'textarea' && (
                      <textarea
                        className="w-full px-4 py-3 rounded-xl border border-border dark:border-surface-container-high bg-cream-veil dark:bg-surface-container-low text-ink dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition resize-none placeholder:text-ink-muted/50"
                        placeholder={input.placeholder}
                        rows={3}
                        value={String(inputs[`${selectedTile}:${input.key}`] || '')}
                        onChange={e => handleInputChange(selectedTile, input.key, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Pricing hint */}
              <div className="rounded-xl bg-primary/10 dark:bg-primary/5 border border-primary/20 p-4">
                <p className="text-body-sm text-ink-soft dark:text-on-surface-variant">
                  💰 <span className="font-semibold text-ink dark:text-on-surface">Pay-Per-Result pricing:</span> You only pay if the workflow completes successfully. ${((selectedMetadata as any).priceCents ?? 499) / 100} per successful run.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty state */}
        {!selectedTile && (
          <div className="text-center py-8">
            <p className="text-body-lg text-ink-muted dark:text-on-surface-variant">
              👆 Pick a workflow above and run it in seconds.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
