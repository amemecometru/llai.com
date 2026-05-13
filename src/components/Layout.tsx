import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useSession, signIn, signOut } from '../lib/auth-client';
import ThemeToggle from './ThemeToggle';
import { brand } from '../data/content';

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onLanding = location.pathname === '/' || location.pathname === '/tiles';

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md transition-colors ${
        scrolled
          ? 'border-b border-border bg-cream/80 dark:border-dark-border dark:bg-dark-bg/80'
          : 'border-b border-transparent bg-cream/0 dark:bg-dark-bg/0'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-8xl items-center justify-between px-6 md:px-10">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-lemon text-base">🍋</span>
          <span className="font-display text-lg font-semibold tracking-tight">{brand.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 text-sm font-medium text-ink-soft dark:text-dark-ink-soft md:flex">
          {session && (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? 'text-ink dark:text-dark-ink' : 'hover:text-ink dark:hover:text-dark-ink'
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/subscribe"
                className={({ isActive }) =>
                  isActive ? 'text-ink dark:text-dark-ink' : 'hover:text-ink dark:hover:text-dark-ink'
                }
              >
                Subscribe
              </NavLink>
            </>
          )}
          {onLanding ? (
            <>
              <a href="#workflows" className="hover:text-ink dark:hover:text-dark-ink">Workflows</a>
              <a href="#pricing" className="hover:text-ink dark:hover:text-dark-ink">Pricing</a>
              <a href="#faq" className="hover:text-ink dark:hover:text-dark-ink">FAQ</a>
            </>
          ) : (
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-ink dark:text-dark-ink' : 'hover:text-ink dark:hover:text-dark-ink'
              }
            >
              Home
            </NavLink>
          )}
          <NavLink
            to="/docs"
            className={({ isActive }) =>
              isActive ? 'text-ink dark:text-dark-ink' : 'hover:text-ink dark:hover:text-dark-ink'
            }
          >
            Docs
          </NavLink>
        </div>

        {/* Auth / Action Section */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {isPending ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-border dark:bg-dark-border" />
          ) : session ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-ink-soft dark:text-dark-ink-soft">
                {session.user.name?.split(' ')[0]}
              </span>
              <button 
                onClick={() => signOut()}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium transition-colors hover:bg-cream-deep dark:border-dark-border dark:hover:bg-dark-bg-2"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn.social({ provider: "google" })}
              className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-cream transition hover:brightness-110 dark:bg-dark-ink dark:text-dark-bg"
            >
              Sign in
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-cream-deep py-16 dark:border-dark-border dark:bg-dark-bg-2">
      <div className="mx-auto grid max-w-8xl gap-12 px-6 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-lemon text-base">🍋</span>
            <span className="font-display text-lg font-semibold tracking-tight">{brand.name}</span>
          </Link>
          <p className="mt-4 max-w-sm font-body text-sm text-ink-soft dark:text-dark-ink-soft">
            AI workflows for your Google Workspace. Stop drowning. Start automating.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.12em] text-ink dark:text-dark-ink">
            Product
          </h4>
          <ul className="space-y-2 text-sm text-ink-soft dark:text-dark-ink-soft">
            <li><Link to="/" className="hover:text-ink dark:hover:text-dark-ink">Home</Link></li>
            <li><a href="/#pricing" className="hover:text-ink dark:hover:text-dark-ink">Pricing</a></li>
            <li><Link to="/docs" className="hover:text-ink dark:hover:text-dark-ink">Docs</Link></li>
            <li><a href="/#faq" className="hover:text-ink dark:hover:text-dark-ink">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.12em] text-ink dark:text-dark-ink">
            Legal
          </h4>
          <ul className="space-y-2 text-sm text-ink-soft dark:text-dark-ink-soft">
            <li><Link to="/terms" className="hover:text-ink dark:hover:text-dark-ink">Terms</Link></li>
            <li><Link to="/privacy" className="hover:text-ink dark:hover:text-dark-ink">Privacy</Link></li>
            <li><Link to="/refund" className="hover:text-ink dark:hover:text-dark-ink">Refund</Link></li>
            <li><Link to="/contact" className="hover:text-ink dark:hover:text-dark-ink">Contact</Link></li>
            <li><Link to="/security" className="hover:text-ink dark:hover:text-dark-ink">Security</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="mx-auto mt-16 max-w-8xl border-t border-border px-6 pt-8 text-xs text-ink-soft/60 dark:border-dark-border">
        © 2026 {brand.name} AI. All rights reserved. · Built for Google Workspace.
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <>
      <Nav />
      <div className="sun-rising" />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
